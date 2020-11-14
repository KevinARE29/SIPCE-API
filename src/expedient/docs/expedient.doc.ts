import { Expose, Type } from 'class-transformer';
import { Session } from '@expedient/docs/session.doc';

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

  @Expose()
  @Type(() => Session)
  sessions!: Session[];
}
