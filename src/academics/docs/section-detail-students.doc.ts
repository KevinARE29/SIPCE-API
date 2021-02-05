import { Expose, Type } from 'class-transformer';
import { StudentsAssignation } from '@students/docs/students-assignation.doc';
import { Section } from './section.doc';

export class SectionDetailStudents {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Section)
  section!: Section;

  @Expose()
  @Type(() => StudentsAssignation)
  students!: StudentsAssignation[];
}
