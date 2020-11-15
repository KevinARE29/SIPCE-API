import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { CompleteSession } from './complete-session.doc';

export class CompleteSessionResponse implements IApiResponse<CompleteSession> {
  @ApiProperty({ type: CompleteSession })
  data!: CompleteSession;
}
