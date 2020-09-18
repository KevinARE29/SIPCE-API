import { IsNotEmpty, IsString, IsEmail, IsPositive, IsInt } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CounselorDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  username!: string;

  @IsInt({ message: validator.isInt, each: true })
  @IsPositive({ message: validator.isPositive, each: true })
  grades!: number[];

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  code!: string;
}
