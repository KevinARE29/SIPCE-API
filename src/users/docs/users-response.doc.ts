import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './users.doc';

export class UsersResponse implements IApiResponse<Users[]> {
  @ApiProperty({ type: [Users] })
  data!: Users[];

  @ApiProperty()
  pagination!: Pagination;
}
