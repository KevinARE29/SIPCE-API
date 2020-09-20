import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class UserDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(32, { message: validator.maxLength })
  readonly code!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(32, { message: validator.maxLength })
  readonly username!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  readonly firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  readonly lastname!: string;

  @IsEmail({}, { message: validator.isEmail })
  @MaxLength(128, { message: validator.maxLength })
  readonly email!: string;
}
