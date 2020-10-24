import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Fouls } from './fouls.doc';

export class FoulsResponse implements IApiResponse<Fouls[]> {
  @ApiProperty({ type: [Fouls] })
  data!: Fouls[];

  pagination?: Pagination;
}
