import { Expose } from 'class-transformer';

export class Expedient {
  @Expose()
  id!: number;

  @Expose()
  referrerName!: string;

  @Expose()
  referrerCharge!: string;

  @Expose()
  reason!: string;

  @Expose()
  problemDescription!: string;

  @Expose()
  diagnosticImpression!: string;

  @Expose()
  diagnosticImpressionCategories!: string[];

  @Expose()
  actionPlan!: string;

  @Expose()
  finalConclusion!: string;
}
