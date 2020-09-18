import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.doc';
import { UserPermission } from '../user-permission.doc';

export class MyProfile {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  code!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  email!: string;

  @Expose()
  active!: boolean;

  @Expose()
  createdAt!: Date;

  @ApiProperty({ type: [UserRole] })
  @Type(() => UserRole)
  @Expose()
  roles!: UserRole[];

  @ApiProperty({ type: [UserPermission] })
  @Type(() => UserPermission)
  @Expose()
  permissions!: UserPermission[];

  @Expose()
  teacherAssignation!: any;

  @Expose()
  counselorAssignation!: any;

  @Expose()
  cycleCoordinatorAssignation!: any;
}
