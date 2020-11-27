import { Expose } from 'class-transformer';

export class FoulsCounter {
  @Expose()
  minorFouls!: number;

  @Expose()
  seriousFouls!: number;

  @Expose()
  verySeriousFouls!: number;

  @Expose()
  totalSanctions!: number;
}
