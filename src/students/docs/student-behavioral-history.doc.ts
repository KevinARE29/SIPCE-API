import { Expose, Type } from 'class-transformer';
import { BehavioralHistory } from '@history/docs/behavioral-history.doc';
import { Student } from './student.doc';

export class StudentBehavioralHistory extends Student {
  @Expose()
  @Type(() => BehavioralHistory)
  behavioralHistory!: BehavioralHistory;

  @Expose()
  expedientAlert!: boolean;
}
