import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { UpdatedStudent } from './updated-student.doc';

export class UpdatedStudentResponse implements IApiResponse<UpdatedStudent> {
  @ApiProperty({ type: UpdatedStudent })
  data!: UpdatedStudent;
}
