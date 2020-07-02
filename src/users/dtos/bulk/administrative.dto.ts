import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class AdministrativeDto {
  @ApiProperty()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  username!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  role!: string;

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  code!: string;
}
