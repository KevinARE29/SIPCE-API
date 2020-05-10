import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { IAuthenticatedUser } from '../../users/interfaces/users.interface';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TokenResponse } from '../docs/token-response.doc';
import { IRefreshTokenPayload } from '../interfaces/refresh-token-payload.interface';
import { TokenRepository } from '../repositories/token.repository';

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
    const accessTokenSecret = this.configService.get<string>('JWT_SECRET_ACCESS_TOKEN') || 'access';
    const refreshTokenSecret = this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN') || 'refresh';
    const accessTokenExp = this.configService.get<string>('ACCESS_TOKEN_EXPIRATION') || 1800000; // 20 min
    const refreshTokenExp = this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') || 7200000; // 2 hours

    const accessToken = sign({ sub: user.username, email: user.email, role: 'Admin' }, accessTokenSecret, {
      expiresIn: accessTokenExp,
    });
    const refreshToken = sign({ sub: user.username }, refreshTokenSecret, { expiresIn: refreshTokenExp });
    const decRefreshToken = verify(refreshToken, refreshTokenSecret) as IRefreshTokenPayload;
    const exp = decRefreshToken.exp;

    await this.tokenRepository.save({ user, accessToken, refreshToken, exp });

    return {
      data: {
        accessToken,
        refreshToken,
        exp,
      },
    };
  }
}
