import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsInt, IsPositive, IsOptional, IsNotEmpty } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class UpdateRoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  name?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  permissions?: number[];
}
