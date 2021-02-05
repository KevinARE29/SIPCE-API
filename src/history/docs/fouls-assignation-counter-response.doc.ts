import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { FoulsAssignationCounter } from './fouls-assignation-counter.doc';

export class FoulsAssignationCounterResponse implements IApiResponse<FoulsAssignationCounter[]> {
  @ApiProperty({ type: [FoulsAssignationCounter] })
  data!: FoulsAssignationCounter[];
}
