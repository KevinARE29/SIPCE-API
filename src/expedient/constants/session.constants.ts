export enum EnumSessionType {
  SESSION_INDIVIDUAL = 'Sesión Individual',
  ENTREVISTA_DOCENTE = 'Entrevista con docente',
  ENTREVISTA_PADRES_DE_FAMILIA = 'Entrevista con padres de familia',
}

export type TSession = keyof typeof EnumSessionType;

export enum EnumServiceType {
  ACADEMICO = 'Académico',
  CONDUCTUAL = 'Conductual',
  EMOCIONAL = 'Emocional',
  VOCACIONAL = 'Vocacional',
  OTRO = 'Otro',
}

export type TService = keyof typeof EnumServiceType;
