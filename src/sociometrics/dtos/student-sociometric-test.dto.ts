import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class StudentSociometricTestDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEmail({}, { message: validator.isEmail })
  readonly email!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly password!: string;
}
