import { Expose, Type } from 'class-transformer';
import { SimpleUser } from '@users/docs/simple-user.doc';
import { Session } from './session.doc';
import { Evaluation } from './evaluation.doc';

export class CompleteSession extends Session {
  @Expose()
  @Type(() => Evaluation)
  evaluations?: number;

  @Type(() => SimpleUser)
  @Expose()
  counselor?: SimpleUser[];
}
