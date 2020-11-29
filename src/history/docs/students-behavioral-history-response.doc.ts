import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '@core/docs/pagination.doc';
import { StudentsBehabioralHistory } from './students-behavioral-history.doc';

export class StudentsBehavioralHistoryResponse implements IApiResponse<StudentsBehabioralHistory[]> {
  @ApiProperty({ type: [StudentsBehabioralHistory] })
  data!: StudentsBehabioralHistory[];

  pagination!: Pagination;
}
