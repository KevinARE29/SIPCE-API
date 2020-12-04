import { Expose } from 'class-transformer';

export class SociometricValues {
  @Expose()
  spArray!: number[];

  @Expose()
  snArray!: number[] | string[];

  @Expose()
  spValArray!: number[];

  @Expose()
  snValArray!: number[] | string[];

  @Expose()
  epArray!: number[];

  @Expose()
  enArray!: number[] | string[];

  @Expose()
  rpArray!: number[];

  @Expose()
  rnArray!: number[] | string[];
}
