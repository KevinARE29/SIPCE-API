import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.doc';

export class RoleResponse implements IApiResponse<Role> {
  @ApiProperty({ type: Role })
  data!: Role;
}
