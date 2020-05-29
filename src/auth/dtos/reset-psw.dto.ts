import { IsNotEmpty, IsJWT } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class ResetPswDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsJWT({ message: validator.isJwt })
  resetPasswordToken!: string;
}
