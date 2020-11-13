export enum EQuestionType {
  'ACEPTACIÓN' = 'Aceptación',
  'LIDERAZGO' = 'Liderazgo',
  'RECHAZO' = 'Rechazo',
}

export type TQuestionType = keyof typeof EQuestionType;
