import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';
import { MySectionAssignation } from './my-section-assignation.doc';

export class MySectionsAssignation {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Grade)
  grade!: Grade;

  @Expose()
  @Type(() => MySectionAssignation)
  sectionDetails!: MySectionAssignation[];
}
