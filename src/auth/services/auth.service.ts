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
      const authenticatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      return authenticatedUser;
    }
    return null;
  }

  async login(user: IAuthenticatedUser): Promise<TokenResponse> {
    const payload = { sub: user.username, email: user.email, role: 'Admin' };
    const tokens = getTokens(payload, this.configService);
    const { accessToken, refreshToken, exp } = tokens.data;

    await this.tokenRepository.save({ user, accessToken, refreshToken, exp });

    return tokens;
  }

  async logout(accessToken: string) {
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
      const payload = { sub: oldRefreshToken.sub, email: oldRefreshToken.email, role: oldRefreshToken.role };
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
