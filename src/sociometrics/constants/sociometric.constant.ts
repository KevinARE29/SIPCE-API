export enum EQuestionType {
  'ACEPTACIÓN/RECHAZO' = 'Aceptación/Rechazo',
  'LIDERAZGO' = 'Liderazgo',
}

export type TQuestionType = keyof typeof EQuestionType;
