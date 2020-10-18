import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Requests } from './requests.doc';

export class RequestsResponse implements IApiResponse<Requests[]> {
  @ApiProperty({ type: [Requests] })
  data!: Requests[];

  pagination!: Pagination;
}
