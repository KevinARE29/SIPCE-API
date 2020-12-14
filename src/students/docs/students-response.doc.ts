import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Students } from './students.doc';

export class StudentsResponse implements IApiResponse<Students[]> {
  @ApiProperty({ type: [Students] })
  data!: Students[];

  pagination?: Pagination;
}
