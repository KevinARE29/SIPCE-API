import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { InterventionProgram } from './intervention-program.doc';

export class AvailableInterventionProgramResponse implements IApiResponse<InterventionProgram[]> {
  @ApiProperty({ type: [InterventionProgram] })
  data!: InterventionProgram[];
}
