import { Expose, Type } from 'class-transformer';
import { User } from '@users/docs/user.doc';
import { Expedient } from './expedient.doc';
import { InterventionProgram } from './intervention-program.doc';
import { CompleteSession } from './complete-session.doc';

export class CompleteReportingExpedient extends Expedient {
  @Expose()
  @Type(() => User)
  expedientCounselor!: User;

  @Expose()
  @Type(() => InterventionProgram)
  activeInterventionPrograms!: InterventionProgram[];

  @Expose()
  expedientGrade!: string;

  @Expose()
  @Type(() => CompleteSession)
  sessions!: CompleteSession[];
}
