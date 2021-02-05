import { Students } from '@students/docs/students.doc';
import { Expose, Type } from 'class-transformer';
import { AnswersPerStudent } from './answers-per-student.doc';
import { GroupalIndexes } from './groupal-indexes.doc';
import { IndividualIndex } from './individual-index.doc';
import { Question } from './question.doc';
import { SociometricValues } from './sociometric-values.doc';

export class SociometricMatrix {
  @Expose()
  @Type(() => Question)
  question!: Question;

  @Expose()
  @Type(() => Students)
  participants!: Students[];

  @Expose()
  sociomatrix!: number[][];

  @Expose()
  @Type(() => SociometricValues)
  sociometricValues!: SociometricValues;

  @Expose()
  @Type(() => IndividualIndex)
  individualIndexes!: IndividualIndex[];

  @Expose()
  @Type(() => GroupalIndexes)
  groupalIndexes!: GroupalIndexes;

  @Expose()
  @Type(() => AnswersPerStudent)
  answersPerStudent!: AnswersPerStudent[];

  @Expose()
  year!: number;

  @Expose()
  shift!: string;

  @Expose()
  grade!: string;

  @Expose()
  section!: string;
}
