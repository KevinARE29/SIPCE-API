import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BehavioralHistoryReport } from './behavioral-history-report.doc';

export class BehavioralHistoryReportResponse implements IApiResponse<BehavioralHistoryReport> {
  @ApiProperty({ type: BehavioralHistoryReport })
  data!: BehavioralHistoryReport;
}
