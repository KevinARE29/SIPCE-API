import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { SociometricReport } from './sociometric-report.doc';

export class SociometricReportResponse implements IApiResponse<SociometricReport> {
  @ApiProperty({ type: SociometricReport })
  data!: SociometricReport;
}
