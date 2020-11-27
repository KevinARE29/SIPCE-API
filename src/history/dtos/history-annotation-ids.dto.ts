import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';
import { StudentHistoryIdsDto } from './student-history-ids.dto';

export class HistoryAnnotationIdsDto extends StudentHistoryIdsDto {
  @Type(() => Number)
  @IsId()
  readonly annotationId!: number;
}
