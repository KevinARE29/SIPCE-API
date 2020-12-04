import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { ExpedientReport } from './expedient-report.doc';

export class ExpedientReportResponse implements IApiResponse<ExpedientReport> {
  @ApiProperty({ type: ExpedientReport })
  data!: ExpedientReport;
}
