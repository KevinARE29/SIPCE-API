import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '@core/docs/pagination.doc';
import { InterventionProgram } from './intervention-program.doc';

export class InterventionProgramsResponse implements IApiResponse<InterventionProgram[]> {
  @ApiProperty({ type: [InterventionProgram] })
  data!: InterventionProgram[];

  pagination!: Pagination;
}
