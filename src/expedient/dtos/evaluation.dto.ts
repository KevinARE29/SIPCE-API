import { IsOptional } from 'class-validator';
import { IsId } from '@core/decorators/id.decorator';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class EvaluationDto extends CreateEvaluationDto {
  @IsId()
  @IsOptional()
  readonly id!: number;
}
