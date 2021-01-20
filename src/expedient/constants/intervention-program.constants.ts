export enum EnumInterventionProgramType {
  INDIVIDUAL_ACADEMICO = 'Individual académico',
  INDIVIDUAL_CONDUCTUAL = 'Individual conductual',
  INDIVIDUAL_EMOCIONAL = 'Individual emocional',
  VOCACIONAL = 'Individual vocacional',
  INDIVIDUAL_MIXTO = 'Individual mixto',
  GRUPALES = 'Grupales',
}

export type TInterventionProgram = keyof typeof EnumInterventionProgramType;
export const interventionProgramTypeKeys = Object.values(EnumInterventionProgramType).filter(
  key => typeof key === 'string',
);
export type TInterventionProgramValues = typeof EnumInterventionProgramType[TInterventionProgram];
