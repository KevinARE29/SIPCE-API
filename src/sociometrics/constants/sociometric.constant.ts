export enum EQuestionType {
  'ACEPTACIÓN/RECHAZO' = 'Aceptación/Rechazo',
  'LIDERAZGO' = 'Liderazgo',
}

export type TQuestionType = keyof typeof EQuestionType;
export const questionTypeKeys = Object.values(EQuestionType).filter(key => typeof key === 'string');
export type TQuestionTypeValues = typeof EQuestionType[TQuestionType];
