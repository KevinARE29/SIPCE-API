import { Session } from '@expedient/entities/session.entity';
import { EnumSessionType } from '@expedient/constants/session.constants';
import { InterventionProgram } from '@expedient/entities/intervention-program.entity';
import { Evaluation } from '@expedient/entities/evaluation.entity';
import { SessionTypeCounter } from '@expedient/docs/session-type-counter.doc';

export function getSessionsCounter(sessions: Session[]): number {
  return sessions.filter(session => !session.deletedAt).length;
}

export function getSessionsTypeCounter(sessions: Session[]): SessionTypeCounter {
  const individualSessionCounter = sessions.filter(
    session => session.sessionType === EnumSessionType.SESSION_INDIVIDUAL,
  ).length;
  const parentsInterviewCounter = sessions.filter(
    session => session.sessionType === EnumSessionType.ENTREVISTA_PADRES_DE_FAMILIA,
  ).length;
  const teachersInterviewCounter = sessions.filter(
    session => session.sessionType === EnumSessionType.ENTREVISTA_DOCENTE,
  ).length;
  return {
    individualSessionCounter,
    parentsInterviewCounter,
    teachersInterviewCounter,
  };
}

export function getExpedientInterventionPrograms(sessions: Session[]): InterventionProgram[] {
  const interventionPrograms: InterventionProgram[] = [];
  sessions.map(session => {
    if (session.interventionProgram) {
      interventionPrograms.push(session.interventionProgram);
    }
  });
  return interventionPrograms;
}

export function getExpedientEvaluations(sessions: Session[]): Evaluation[] {
  const evaluations: Evaluation[] = [];
  sessions.map(session => {
    if (session.evaluations.length) {
      evaluations.push(...session.evaluations);
    }
  });
  return evaluations;
}
