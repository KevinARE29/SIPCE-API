import { Expose, Type } from 'class-transformer';
import { UserRole } from './user-role.doc';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleUser {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @ApiProperty({ type: [UserRole] })
  @Type(() => UserRole)
  @Expose()
  roles!: UserRole[];
}