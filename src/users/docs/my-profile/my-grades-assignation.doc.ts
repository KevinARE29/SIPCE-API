import { Expose, Type } from 'class-transformer';
import { MyCyclesAssignation } from './my-cycles-assignation.doc';
import { MySectionsAssignation } from './my-sections-assignation.doc';

export class MyGradesAssignation extends MyCyclesAssignation {
  @Expose()
  @Type(() => MySectionsAssignation)
  gradeDetails!: MySectionsAssignation[];
}
