import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Politic {
  @ApiProperty()
  @Expose()
  id!: number;

  @Expose()
  minLength!: number;

  @Expose()
  capitalLetter!: boolean;

  @Expose()
  lowerCase!: boolean;

  @Expose()
  specialChart!: boolean;

  @Expose()
  numericChart!: boolean;

  @Expose()
  typeSpecial!: string;
}
