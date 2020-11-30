import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { StudentBehavioralHistoryInformation } from './student-behavioral-history-information.doc';

export class StudentBehavioralHistoryInformationResponse
  implements IApiResponse<StudentBehavioralHistoryInformation[]> {
  @ApiProperty({ type: [StudentBehavioralHistoryInformation] })
  data!: StudentBehavioralHistoryInformation[];
}
