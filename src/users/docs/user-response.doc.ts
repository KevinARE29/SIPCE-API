import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.doc';

export class UserResponse implements IApiResponse<User> {
  @ApiProperty({ type: [User] })
  data!: User;
}
