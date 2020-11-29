import { Students } from '@students/docs/students.doc';
import { Expose } from 'class-transformer';

export class SociometricTestStudent extends Students {
  @Expose()
  completed!: boolean;
}
