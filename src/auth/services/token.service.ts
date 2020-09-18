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
    const accessTokenSecret = this.configService.get('JWT_SECRET_ACCESS_TOKEN');
    const refreshTokenSecret = this.configService.get('JWT_SECRET_REFRESH_TOKEN');
    const accessTokenExp = this.configService.get('ACCESS_TOKEN_EXPIRATION');
    const refreshTokenExp = this.configService.get('REFRESH_TOKEN_EXPIRATION');

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
    const resetPswSecret = this.configService.get('JWT_SECRET_PASSWORD_RESET');
    const resetPswExp = this.configService.get('PASSWORD_RESET_EXPIRATION'); // 24 h

    return sign({ id }, resetPswSecret, { expiresIn: resetPswExp });
  }

  getPswTokenPayload(resetPasswordToken: string): IPswTokenPayload {
    const resetPswSecret = this.configService.get('JWT_SECRET_PASSWORD_RESET');
    try {
      return verify(resetPasswordToken, resetPswSecret) as IPswTokenPayload;
    } catch {
      throw new ConflictException('Invalid Reset Password Token');
    }
  }
}
