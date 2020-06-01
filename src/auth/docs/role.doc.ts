import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Permission } from './permission.doc';

export class Role {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @ApiProperty({ type: [Permission] })
  @Type(() => Permission)
  @Expose()
  permissions!: Permission[];
}
