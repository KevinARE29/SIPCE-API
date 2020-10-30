import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Sanctions } from '@sanctions/docs/sanctions.doc';

export class SanctionResponse implements IApiResponse<Sanctions> {
  @ApiProperty({ type: Sanctions })
  data!: Sanctions;
}
