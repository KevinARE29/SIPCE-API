import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CreateSanctionsDto {
  @IsNotEmpty()
  @IsString({ message: validator.isString })
  readonly name!: string;

  @IsNotEmpty()
  @IsString({ message: validator.isString })
  readonly numeral!: string;

  @IsNotEmpty()
  @IsString({ message: validator.isString })
  readonly description!: string;
}
