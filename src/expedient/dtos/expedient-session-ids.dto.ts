import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';
import { StudentExpedientIdsDto } from './student-expedient-ids.dto';

export class ExpedientSessionIdsDto extends StudentExpedientIdsDto {
  @Type(() => Number)
  @IsId()
  readonly sessionId!: number;
}
