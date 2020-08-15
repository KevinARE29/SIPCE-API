import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.doc';

export class UsersResponse implements IApiResponse<User[]> {
  @ApiProperty({ type: [User] })
  data!: User[];

  @ApiProperty()
  pagination?: Pagination;
}
