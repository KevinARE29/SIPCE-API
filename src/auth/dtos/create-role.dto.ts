import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export class CreateRoleDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly name!: string;

  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly permissions!: number[];
}
