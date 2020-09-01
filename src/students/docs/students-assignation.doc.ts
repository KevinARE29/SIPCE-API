import { Expose, Type } from 'class-transformer';
import { Image } from '@core/docs/image.doc';
import { Section } from '@academics/docs/section.doc';
import { Students } from './students.doc';

export class StudentsAssignation extends Students {
  @Expose()
  @Type(() => Section)
  section!: Section;

  @Expose()
  @Type(() => Image)
  images!: Image[];
}
