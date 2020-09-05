import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class ScheduleIdDto {
  @Type(() => Number)
  @IsId()
  eventId!: number;
}
