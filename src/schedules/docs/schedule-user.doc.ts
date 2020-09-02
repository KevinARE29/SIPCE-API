import { Expose, Type } from 'class-transformer';
import { UserPermission } from '@users/docs/user-permission.doc';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleUser {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @ApiProperty({ type: [UserPermission] })
  @Type(() => UserPermission)
  @Expose()
  permissions!: UserPermission[];
}