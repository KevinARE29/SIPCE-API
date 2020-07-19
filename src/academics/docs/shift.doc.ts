import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Shift {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}