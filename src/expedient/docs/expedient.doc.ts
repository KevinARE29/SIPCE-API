import { GradeDetail } from '@academics/docs/grade-detail.doc';
import { Expose, Type } from 'class-transformer';

export class Expedient {
  @Expose()
  id!: number;

  @Expose()
  referrerName!: string;

  @Expose()
  reason!: string;

  @Expose()
  problemDescription!: string;

  @Expose()
  diagnosticImpression!: string;

  @Expose()
  diagnosticImpressionCategories!: string[];

  @Expose()
  externalPsychologicalTreatments!: string[];

  @Expose()
  actionPlan!: string;

  @Expose()
  finalConclusion!: string;

  @Type(() => GradeDetail)
  @Expose()
  gradeDetail?: GradeDetail;
}
