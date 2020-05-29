import { IsJWT } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class RefreshTokenDto {
  @IsJWT({ message: validator.isJwt })
  refreshToken!: string;
}
