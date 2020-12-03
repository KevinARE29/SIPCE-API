import { Expose, Type } from 'class-transformer';
import { StudentBehavioralHistoryInformation } from './student-behavioral-history-information.doc';
import { CompleteBehavioralHistoryFouls } from './complete-behavioral-history-fouls.doc';
import { CompleteAnnotation } from './complete-annotation.doc';

export class StudentBehavioralHistoryInformationReport extends StudentBehavioralHistoryInformation {
  @Expose()
  @Type(() => CompleteAnnotation)
  annotations!: CompleteAnnotation[];

  @Expose()
  @Type(() => CompleteBehavioralHistoryFouls)
  behavioralHistoryfouls!: CompleteBehavioralHistoryFouls[];
}
