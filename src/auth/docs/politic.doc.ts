import { Expose } from 'class-transformer';

export class Politic {
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
