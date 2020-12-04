import { Expose, Type } from 'class-transformer';
import { BaseUser } from '@core/docs/base-user.doc';
import { Grade } from './grade.doc';
import { SectionDetail } from './section-detail.doc';

export class GradeDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Grade)
  grade!: Grade;

  @Expose()
  @Type(() => BaseUser)
  counselor!: BaseUser;

  @Expose()
  @Type(() => SectionDetail)
  sectionDetails!: SectionDetail[];

  @Expose()
  closed?: boolean;

  @Expose()
  gradePercentage?: number;
}
