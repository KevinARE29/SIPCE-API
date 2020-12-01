import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { FoulSanctionAssignation } from '@history/docs/foul-sanction-assignation.doc';

export class FoulSanctionAssignationResponse implements IApiResponse<FoulSanctionAssignation> {
  @ApiProperty({ type: FoulSanctionAssignation })
  data!: FoulSanctionAssignation;
}
