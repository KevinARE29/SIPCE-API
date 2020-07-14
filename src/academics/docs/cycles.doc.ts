import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Cycles {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
