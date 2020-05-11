import { Injectable, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { IAuthenticatedUser } from '../../users/interfaces/users.interface';
import { ConfigService } from '@nestjs/config';
import { TokenResponse } from '../docs/token-response.doc';
import { TokenRepository } from '../repositories/token.repository';
import { getTokens } from '../utils/token.utils';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { verify } from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  async validateUser(username: string, password: string): Promise<IAuthenticatedUser | null> {
    const user = await this.usersService.findByUserName(username);
    if (user && this.usersService.compareHash(password, user.password)) {
      const userPermissions = [] as Array<Permission>;
      user.roles.forEach(rol => {
        userPermissions.push(...rol.permissions);
      });
      user.permissions.forEach(permission => userPermissions.push(permission));

      const permissionIds = userPermissions.map(permission => permission.id);
      const permissions = [...new Set(permissionIds)];
      const authenticatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        permissions,
      };
      return authenticatedUser;
    }
    return null;
  }

  async login(user: IAuthenticatedUser): Promise<TokenResponse> {
    const payload = { sub: user.username, email: user.email, permissions: user.permissions };
    const tokens = getTokens(payload, this.configService);
    const { accessToken, refreshToken, exp } = tokens.data;
    await this.tokenRepository.save({ user: { id: user.id }, accessToken, refreshToken, exp });
    return tokens;
  }

  async logout(accessToken: string) {
    const token = await this.tokenRepository.findOne({ where: { accessToken } });
    if (!token) {
      throw new UnauthorizedException('Token not found in DB');
    }
    await this.tokenRepository.delete({ accessToken });
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    try {
      const refreshTokenSecret = this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN') || 'refresh';
      const oldRefreshToken = verify(refreshTokenDto.refreshToken, refreshTokenSecret) as ITokenPayload;

      const token = await this.tokenRepository.findOne({
        where: { refreshToken: refreshTokenDto.refreshToken },
        relations: ['user'],
      });
      if (!token) {
        throw Error;
      }
      const payload = {
        sub: oldRefreshToken.sub,
        email: oldRefreshToken.email,
        permissions: oldRefreshToken.permissions,
      };
      const tokens = getTokens(payload, this.configService);

      const updatedToken = {
        ...token,
        ...tokens.data,
      };
      await this.tokenRepository.save(updatedToken);

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
