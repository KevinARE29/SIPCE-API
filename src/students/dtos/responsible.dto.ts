import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString, IsEmail, IsNumberString } from 'class-validator';

export class ResponsibleDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  relationship!: string;

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsNumberString({}, { message: validator.isString })
  phone!: string;
}
