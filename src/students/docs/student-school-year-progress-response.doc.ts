import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { StudentSchoolYearProgress } from './student-school-year-progress.doc';

export class StudentSchoolYearProgressResponse implements IApiResponse<StudentSchoolYearProgress> {
  @ApiProperty({ type: StudentSchoolYearProgress })
  data!: StudentSchoolYearProgress;
}
