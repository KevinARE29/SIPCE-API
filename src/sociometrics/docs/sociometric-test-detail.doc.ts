import { Students } from '@students/docs/students.doc';
import { Expose, Type } from 'class-transformer';
import { Answer } from './answer.doc';
import { SociometricTest } from './sociometric-test.doc';

export class SociometricTestDetail {
  @Expose()
  id!: number;

  @Expose()
  finished!: boolean;

  @Expose()
  @Type(() => SociometricTest)
  sociometricTest!: SociometricTest;

  @Expose()
  @Type(() => Students)
  student!: Students;

  @Expose()
  @Type(() => Answer)
  answers!: Answer[];
}
