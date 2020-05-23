import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { TokenResponse } from '../docs/token-response.doc';

export function getTokens(payload: ITokenPayload, configService: ConfigService): TokenResponse {
  const accessTokenSecret = configService.get<string>('JWT_SECRET_ACCESS_TOKEN') || 'access';
  const refreshTokenSecret = configService.get<string>('JWT_SECRET_REFRESH_TOKEN') || 'refresh';
  const accessTokenExp = configService.get<string>('ACCESS_TOKEN_EXPIRATION') || 1800000; // 20 min
  const refreshTokenExp = configService.get<string>('REFRESH_TOKEN_EXPIRATION') || 7200000; // 2 hours

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

export function getPswToken(email: string, configService: ConfigService): string {
  const resetPswSecret = configService.get<string>('JWT_SECRET_PASSWORD_RESET') || 'passwordReset';
  const resetPswExp = configService.get<string>('PASSWORD_RESET_EXPIRATION') || 86400000; // 24 h

  return sign({ email }, resetPswSecret, { expiresIn: resetPswExp });
}
