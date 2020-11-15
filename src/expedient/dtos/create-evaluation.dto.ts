import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CreateEvaluationDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly description!: string;
}
