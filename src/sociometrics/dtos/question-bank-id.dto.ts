import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class QuestionBankIdDto {
  @IsId()
  @Type(() => Number)
  readonly questionBankId!: number;
}
