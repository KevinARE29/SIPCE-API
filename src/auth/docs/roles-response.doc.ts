import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from './roles.doc';

export class RolesResponse implements IApiResponse<Roles[]> {
  @ApiProperty({ type: [Roles] })
  data!: Roles[];

  @ApiProperty()
  pagination!: Pagination;
}
