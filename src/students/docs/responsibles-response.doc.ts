import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Responsible } from './responsible.doc';

export class ResponsiblesResponse implements IApiResponse<Responsible[]> {
  @ApiProperty({ type: [Responsible] })
  data!: Responsible[];

  @ApiProperty()
  pagination!: Pagination;
}
