import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { AccessLogs } from './access-logs.doc';

export class AccessLogsResponse implements IApiResponse<AccessLogs[]> {
  @ApiProperty({ type: [AccessLogs] })
  data!: AccessLogs[];

  @ApiProperty()
  pagination!: Pagination;
}
