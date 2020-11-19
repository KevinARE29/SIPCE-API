import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { SessionsReport } from './sessions-report.doc';

export class SessionsReportResponse implements IApiResponse<SessionsReport[]> {
  @ApiProperty({ type: [SessionsReport] })
  data!: SessionsReport[];
}
