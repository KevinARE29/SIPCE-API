import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Shift } from '@academics/docs/shift.doc';

export class ShiftsResponse implements IApiResponse<Shift[]> {
  @ApiProperty({ type: [Shift] })
  data!: Shift[];

  @ApiProperty()
  pagination!: Pagination;
}
