import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Cycle {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
