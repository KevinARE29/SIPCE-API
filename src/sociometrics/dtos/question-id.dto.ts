import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class QuestionIdDto {
  @IsId()
  @Type(() => Number)
  readonly questionId!: number;
}
