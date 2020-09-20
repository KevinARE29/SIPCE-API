import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export class UpdateRoleDto {
  @IsOptional()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly name?: string;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly permissions?: number[];
}
