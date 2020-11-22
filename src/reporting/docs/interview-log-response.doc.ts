import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { InterviewLog } from './interview-log.doc';

export class InterviewLogResponse implements IApiResponse<InterviewLog> {
  @ApiProperty({ type: InterviewLog })
  data!: InterviewLog;
}
