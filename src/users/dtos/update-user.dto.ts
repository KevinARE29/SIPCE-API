import { IsBoolean, IsOptional, IsString, IsArray, IsInt, IsPositive } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: validator.isString })
  username?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  firstname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  lastname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  email?: string;

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

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  active?: boolean;
}
