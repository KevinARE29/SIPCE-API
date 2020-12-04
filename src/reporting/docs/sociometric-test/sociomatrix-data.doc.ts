import { SociometricValues } from '@sociometrics/docs/sociometric-values.doc';
import { StudentsAssignation } from '@students/docs/students-assignation.doc';
import { Expose } from 'class-transformer';

export class SociomatrixData {
  @Expose()
  participants!: StudentsAssignation;

  @Expose()
  sociomatrix!: number[][];

  @Expose()
  sociometricValues!: SociometricValues;
}
