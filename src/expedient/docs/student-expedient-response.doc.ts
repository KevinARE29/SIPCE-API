import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { CompleteExpedient } from './complete-expedient.doc';

export class StudentExpedientResponse implements IApiResponse<CompleteExpedient> {
  @ApiProperty({ type: CompleteExpedient })
  data!: CompleteExpedient;
}
