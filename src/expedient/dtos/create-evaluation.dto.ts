import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CreateEvaluationDto {
  @IsNotEmpty()
  @IsString({ message: validator.isString })
  readonly description!: string;
}
