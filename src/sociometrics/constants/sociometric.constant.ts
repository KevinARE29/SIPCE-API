export enum EQuestionType {
  'ACEPTACIÓN/RECHAZO' = 'Aceptación/Rechazo',
  'LIDERAZGO' = 'Liderazgo',
}

export type TQuestionType = keyof typeof EQuestionType;
export const questionTypeKeys = Object.values(EQuestionType).filter(key => typeof key === 'string');
export type TQuestionTypeValues = typeof EQuestionType[TQuestionType];

export enum ESociometricTestStatus {
  'CREADA' = 'Creada',
  'EN CURSO' = 'En curso',
  'FINALIZADA' = 'Finalizada',
  'PROGRAMADA' = 'Programada',
}

export type TSociometricTestStatus = keyof typeof ESociometricTestStatus;
export const sociometricTestStatusKeys = Object.values(ESociometricTestStatus).filter(key => typeof key === 'string');
export type TSociometricTestStatusValues = typeof ESociometricTestStatus[TSociometricTestStatus];
