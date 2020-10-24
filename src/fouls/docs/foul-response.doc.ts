import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Fouls } from '@fouls/docs/fouls.doc';

export class FoulResponse implements IApiResponse<Fouls> {
  @ApiProperty({ type: Fouls })
  data!: Fouls;
}
