import { IsNotEmpty, IsEmail } from 'class-validator';
import { validator } from '../../core/messages/validator.message';

export class ForgotPswDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEmail({}, { message: validator.isEmail })
  email!: string;
}
