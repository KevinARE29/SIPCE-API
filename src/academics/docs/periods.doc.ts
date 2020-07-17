import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Periods {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}
