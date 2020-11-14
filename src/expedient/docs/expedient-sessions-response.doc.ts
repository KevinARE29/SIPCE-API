import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ExpedientSessions } from './expedient-sessions.doc';

export class ExpedientSessionsResponse implements IApiResponse<ExpedientSessions> {
  @ApiProperty({ type: ExpedientSessions })
  data!: ExpedientSessions;
}
