import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Roles {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  usersCount!: number;
}
