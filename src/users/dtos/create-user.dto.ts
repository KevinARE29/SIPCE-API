import { IsString, IsArray, IsInt, IsPositive, IsOptional, IsEmail } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CreateUserDto {
  @IsString({ message: validator.isString })
  code!: string;

  @IsString({ message: validator.isString })
  username!: string;

  @IsString({ message: validator.isString })
  firstname!: string;

  @IsString({ message: validator.isString })
  lastname!: string;

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  roleIds?: number[];

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  permissionIds?: number[];
}
