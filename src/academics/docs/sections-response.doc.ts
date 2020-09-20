import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Section } from '@academics/docs/section.doc';

export class SectionsResponse implements IApiResponse<Section[]> {
  @ApiProperty({ type: [Section] })
  data!: Section[];

  pagination?: Pagination;
}
