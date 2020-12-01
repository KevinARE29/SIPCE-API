import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { FoulSanctionAssignation } from './foul-sanction-assignation.doc';

export class FoulSanctionAssignationResponses implements IApiResponse<FoulSanctionAssignation[]> {
  @ApiProperty({ type: [FoulSanctionAssignation] })
  data!: FoulSanctionAssignation[];

  pagination?: Pagination;
}
