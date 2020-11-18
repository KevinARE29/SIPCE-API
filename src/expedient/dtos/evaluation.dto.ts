import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class EvaluationDto extends CreateEvaluationDto {
  @IsId()
  @IsOptional()
  readonly id!: number;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly description!: string;
}
