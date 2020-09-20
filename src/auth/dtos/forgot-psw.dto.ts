import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class ForgotPswDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEmail({}, { message: validator.isEmail })
  @MaxLength(128, { message: validator.maxLength })
  readonly email!: string;
}
