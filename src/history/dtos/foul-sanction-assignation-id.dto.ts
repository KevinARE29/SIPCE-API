import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';
import { StudentHistoryIdsDto } from './student-history-ids.dto';

export class FoulSanctionAssignationIdDto extends StudentHistoryIdsDto {
  @Type(() => Number)
  @IsId()
  readonly assignationId!: number;
}
