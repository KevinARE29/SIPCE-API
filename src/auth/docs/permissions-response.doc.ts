import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Permission } from './permission.doc';

export class PermissionsResponse implements IApiResponse<Permission[]> {
  @ApiProperty({ type: [Permission] })
  data!: Permission[];
}
