import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class UserDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  username!: string;

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  code!: string;
}
