import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from './student.doc';

export class StudentResponse implements IApiResponse<Student> {
  @ApiProperty({ type: Student })
  data!: Student;
}
