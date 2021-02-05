import { Expose, Type } from 'class-transformer';
import { Expedient } from './expedient.doc';
import { SessionTypeCounter } from './session-type-counter.doc';
import { InterventionProgram } from './intervention-program.doc';
import { Evaluation } from './evaluation.doc';

export class CompleteExpedient extends Expedient {
  @Expose()
  @Type(() => SessionTypeCounter)
  sessionsCounter!: SessionTypeCounter;

  @Expose()
  @Type(() => InterventionProgram)
  activeInterventionPrograms!: InterventionProgram[];

  @Expose()
  @Type(() => Evaluation)
  evaluations!: Evaluation[];

  @Expose()
  expedientGrade!: string;

  @Expose()
  editable!: boolean;
}
