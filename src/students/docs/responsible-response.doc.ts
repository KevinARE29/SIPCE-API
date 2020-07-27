import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Responsible } from './responsible.doc';

export class ResponsibleResponse implements IApiResponse<Responsible> {
  @ApiProperty({ type: Responsible })
  data!: Responsible;
}
