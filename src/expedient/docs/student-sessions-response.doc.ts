import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { StudentSessions } from './student-sessions.doc';

export class StudentSessionsResponse implements IApiResponse<StudentSessions[]> {
  @ApiProperty({ type: [StudentSessions] })
  data!: StudentSessions[];

  pagination!: Pagination;
}
