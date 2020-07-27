import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Responsibles } from './responsibles.doc';

export class ResponsiblesResponse implements IApiResponse<Responsibles[]> {
  @ApiProperty({ type: [Responsibles] })
  data!: Responsibles[];

  @ApiProperty()
  pagination!: Pagination;
}
