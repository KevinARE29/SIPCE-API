import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Sanctions } from '@sanctions/docs/sanctions.doc';

export class SanctionsResponse implements IApiResponse<Sanctions[]> {
  @ApiProperty({ type: [Sanctions] })
  data!: Sanctions[];

  pagination?: Pagination;
}
