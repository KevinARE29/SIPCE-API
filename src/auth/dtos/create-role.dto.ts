import { IsNotEmpty, IsString, IsArray, MaxLength } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export class CreateRoleDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  readonly name!: string;

  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly permissions!: number[];
}
