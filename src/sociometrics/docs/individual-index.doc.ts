import { Students } from '@students/docs/students.doc';
import { Expose, Type } from 'class-transformer';

export class IndividualIndex {
  @Expose()
  @Type(() => Students)
  student!: Students;

  @Expose()
  pop!: number;

  @Expose()
  ant!: number;

  @Expose()
  expP!: number;

  @Expose()
  expN!: number;

  @Expose()
  ca!: number;
}
