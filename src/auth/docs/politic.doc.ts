import { ApiProperty } from '@nestjs/swagger';

export class Politic {
  @ApiProperty()
  id!: number;
  minLength!: number;
  capitalLetter!: boolean;
  lowerCase!: boolean;
  specialChart!: boolean;
  numericChart!: boolean;
  typeSpecial!: string;
}
