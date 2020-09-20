import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class ScheduleIdDto {
  @Type(() => Number)
  @IsId()
  readonly eventId!: number;
}
