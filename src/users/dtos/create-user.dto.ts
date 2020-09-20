import { IsString, IsArray, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly code!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly username!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly lastname!: string;

  @IsEmail({}, { message: validator.isEmail })
  readonly email!: string;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly roleIds?: number[];

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly permissionIds?: number[];
}
