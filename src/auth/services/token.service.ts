import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { ConflictException, Injectable } from '@nestjs/common';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { TokenResponse } from '../docs/token-response.doc';
import { IPswTokenPayload } from '../interfaces/psw-token-payload.interface';

@Injectable()
export class TokensService {
  constructor(private readonly configService: ConfigService) {}

  getTokens(payload: ITokenPayload): TokenResponse {
    const accessTokenSecret = this.configService.get<string>('JWT_SECRET_ACCESS_TOKEN') || 'access';
    const refreshTokenSecret = this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN') || 'refresh';
    const accessTokenExp = this.configService.get<string>('ACCESS_TOKEN_EXPIRATION') || 1800000; // 20 min
    const refreshTokenExp = this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') || 7200000; // 2 hours

    const accessToken = sign(payload, accessTokenSecret, { expiresIn: accessTokenExp });
    const refreshToken = sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExp });
    const decRefreshToken = verify(refreshToken, refreshTokenSecret) as ITokenPayload;
    const { exp } = decRefreshToken;

    return {
      data: {
        accessToken,
        refreshToken,
        exp,
      },
    };
  }

  getPswToken(id: number): string {
    const resetPswSecret = this.configService.get<string>('JWT_SECRET_PASSWORD_RESET') || 'passwordReset';
    const resetPswExp = this.configService.get<string>('PASSWORD_RESET_EXPIRATION') || 86400000; // 24 h

    return sign({ id }, resetPswSecret, { expiresIn: resetPswExp });
  }

  getPswTokenPayload(resetPasswordToken: string): IPswTokenPayload {
    const resetPswSecret = this.configService.get<string>('JWT_SECRET_PASSWORD_RESET') || 'passwordReset';
    try {
      return verify(resetPasswordToken, resetPswSecret) as IPswTokenPayload;
    } catch {
      throw new ConflictException('Invalid Reset Password Token');
    }
  }
}
