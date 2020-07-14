import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Cycle } from '@academics/docs/cycle.doc';

export class CyclesResponse implements IApiResponse<Cycle[]> {
  @ApiProperty({ type: [Cycle] })
  data!: Cycle[];

  @ApiProperty()
  pagination!: Pagination;
}
