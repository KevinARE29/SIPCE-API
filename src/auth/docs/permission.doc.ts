import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Permission {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  codename!: string;
}
