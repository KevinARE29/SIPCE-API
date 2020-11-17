import { Session } from '@expedient/entities/session.entity';

export function getSessionsCounter(sessions: Session[]): number {
  return sessions.filter(session => !session.deletedAt).length;
}
