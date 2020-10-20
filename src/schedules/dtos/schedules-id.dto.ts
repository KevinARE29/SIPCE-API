import { IsId } from '@core/decorators/id.decorator';
import { IsArray } from 'class-validator';

export class SchedulesIdDto {

  @IsArray()
  @IsId({ each: true })
  readonly eventsId!: number[];
}
