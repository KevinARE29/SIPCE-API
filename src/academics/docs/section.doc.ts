import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Section {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
