import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '@core/docs/pagination.doc';
import { Session } from './session.doc';

export class ExpedientSessionsResponse implements IApiResponse<Session[]> {
  @ApiProperty({ type: [Session] })
  data!: Session[];

  pagination!: Pagination;
}
