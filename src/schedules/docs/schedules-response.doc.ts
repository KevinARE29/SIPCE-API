import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from './schedules.doc';

export class SchedulesResponse implements IApiResponse<Schedule> {
  @ApiProperty({ type: [Schedule] })
  data!: Schedule;
}
