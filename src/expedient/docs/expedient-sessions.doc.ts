import { Expose, Type } from 'class-transformer';
import { Session } from '@expedient/docs/session.doc';
import { Expedient } from './expedient.doc';

export class ExpedientSessions extends Expedient {
  @Expose()
  @Type(() => Session)
  sessions!: Session[];
}
