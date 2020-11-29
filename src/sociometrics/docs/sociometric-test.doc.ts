import { Grade } from '@academics/docs/grade.doc';
import { Section } from '@academics/docs/section.doc';
import { Shift } from '@academics/docs/shift.doc';
import { Expose, Type } from 'class-transformer';
import { Preset } from './preset.doc';
import { QuestionBank } from './question-bank.doc';
import { SociometricTestStudent } from './sociometric-test-student.doc';

export class SociometricTest {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Shift)
  shift!: Shift;

  @Expose()
  @Type(() => Grade)
  grade!: Grade;

  @Expose()
  @Type(() => Section)
  section!: Section;

  @Expose()
  completed!: boolean;

  @Expose()
  status!: string;

  @Expose()
  answersPerQuestion!: string;

  @Expose()
  totalStudents!: number;

  @Expose()
  completedStudents!: number;

  @Expose()
  @Type(() => QuestionBank)
  questionBank!: QuestionBank;

  @Expose()
  @Type(() => Preset)
  presets!: Preset[];

  @Expose()
  @Type(() => SociometricTestStudent)
  students!: SociometricTestStudent[];
}
