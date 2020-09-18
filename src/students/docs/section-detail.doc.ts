import { Expose, Type } from 'class-transformer';
import { Section } from '@academics/docs/section.doc';
import { SGradeDetail } from './grade-detail.doc';

export class SSectionDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Section)
  section!: Section;

  @Expose()
  @Type(() => SGradeDetail)
  gradeDetail!: SGradeDetail;
}
