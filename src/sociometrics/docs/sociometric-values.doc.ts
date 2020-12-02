import { Expose } from 'class-transformer';

export class SociometricValues {
  @Expose()
  spArray!: number;

  @Expose()
  snArray!: string;

  @Expose()
  spValArray!: string;

  @Expose()
  snValArray!: number[];

  @Expose()
  epArray!: number[];

  @Expose()
  enArray!: number[];

  @Expose()
  rpArray!: number[];

  @Expose()
  rnArray!: number[];
}
