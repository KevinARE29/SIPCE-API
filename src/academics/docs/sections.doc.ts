import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Sections {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
