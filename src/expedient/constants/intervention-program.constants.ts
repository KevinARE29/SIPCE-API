export enum EnumInterventionProgramType {
  INDIVIDUAL_ACADEMICO = 'Individual académico',
  INDIVIDUAL_CONDUCTUAL = 'Individual conductual',
  INDIVIDUAL_EMOCIONAL = 'Individual emocional',
  INDIVIDUAL_MIXTO = 'Individual mixto',
  GRUPALES = 'Grupales',
}

export type TInterventionProgram = keyof typeof EnumInterventionProgramType;
