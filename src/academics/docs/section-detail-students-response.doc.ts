import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { SectionDetailStudents } from './section-detail-students.doc';

export class SectionDetailStudentsResponse implements IApiResponse<SectionDetailStudents> {
  @ApiProperty({ type: SectionDetailStudents })
  data!: SectionDetailStudents;
}
