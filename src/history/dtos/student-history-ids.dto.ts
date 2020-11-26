import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class StudentHistoryIdsDto {
  @Type(() => Number)
  @IsId()
  readonly studentId!: number;

  @Type(() => Number)
  @IsId()
  readonly historyId!: number;
}
