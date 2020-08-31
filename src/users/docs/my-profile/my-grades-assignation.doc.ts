import { Expose, Type } from 'class-transformer';
import { MyCyclesAssignation } from './my-cycles-assignation.doc';
import { MyGradeAssignation } from './my-grade-assignation.doc';

export class MyGradesAssignation extends MyCyclesAssignation {
  @Expose()
  @Type(() => MyGradeAssignation)
  gradeDetails!: MyGradeAssignation[];
}
