import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { ActionLogs } from './action-logs.doc';

export class ActionLogsResponse implements IApiResponse<ActionLogs[]> {
  @ApiProperty({ type: [ActionLogs] })
  data!: ActionLogs[];

  @ApiProperty()
  pagination!: Pagination;
}
