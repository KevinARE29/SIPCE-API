import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Period } from '@academics/docs/period.doc';

export class PeriodsResponse implements IApiResponse<Period[]> {
  @ApiProperty({ type: [Period] })
  data!: Period[];

  @ApiProperty()
  pagination!: Pagination;
}
