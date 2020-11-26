import { Expose, Type } from 'class-transformer';
import { SimpleUser } from '@users/docs/simple-user.doc';
import { Session } from './session.doc';
import { Evaluation } from './evaluation.doc';
import { SessionResponsibleAssistence } from './session-responsible-assistence.doc';
import { InterventionProgram } from './intervention-program.doc';

export class CompleteSession extends Session {
  @Expose()
  @Type(() => Evaluation)
  evaluations?: Evaluation[];

  @Type(() => SimpleUser)
  @Expose()
  counselor?: SimpleUser[];

  @Type(() => SessionResponsibleAssistence)
  @Expose()
  sessionResponsibleAssistence?: SessionResponsibleAssistence;

  @Type(() => InterventionProgram)
  @Expose()
  interventionProgram?: InterventionProgram;
}
