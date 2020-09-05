import { Expose, Type } from 'class-transformer';
import { Section } from '@academics/docs/section.doc';

export class MySectionAssignation {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Section)
  section!: Section;
}
