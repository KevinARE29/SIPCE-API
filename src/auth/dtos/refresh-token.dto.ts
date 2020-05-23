import { IsJWT } from 'class-validator';
import { validator } from 'src/core/messages/validator.message';

export class RefreshTokenDto {
  @IsJWT({ message: validator.isJwt })
  refreshToken!: string;
}
