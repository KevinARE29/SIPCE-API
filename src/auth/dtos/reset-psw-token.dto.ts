import { IsNotEmpty, IsJWT } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class ResetPswTokenDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsJWT({ message: validator.isJwt })
  readonly resetPasswordToken!: string;
}
