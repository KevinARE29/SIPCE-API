import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Cycle } from '@academics/docs/cycle.doc';

export class CycleResponse implements IApiResponse<Cycle> {
  @ApiProperty({ type: Cycle })
  data!: Cycle;
}
