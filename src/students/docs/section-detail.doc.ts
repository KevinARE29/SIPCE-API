import { Expose, Type } from 'class-transformer';
import { Section } from '@academics/docs/section.doc';
import { GradeDetail } from './grade-detail.doc';

export class SectionDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Section)
  section!: Section;

  @Expose()
  @Type(() => GradeDetail)
  gradeDetail!: GradeDetail;
}
