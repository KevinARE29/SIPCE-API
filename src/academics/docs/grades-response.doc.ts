import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Grade } from '@academics/docs/grade.doc';

export class GradesResponse implements IApiResponse<Grade[]> {
  @ApiProperty({ type: [Grade] })
  data!: Grade[];

  @ApiProperty()
  pagination!: Pagination;
}
