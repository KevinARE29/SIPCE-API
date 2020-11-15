export enum EnumSessionType {
  SESSION_INDIVIDUAL = 'Sesión individual',
  ENTREVISTA_DOCENTE = 'Entrevista con docente',
  ENTREVISTA_PADRES_DE_FAMILIA = 'Entrevista con padres de familia',
}

export type TSession = keyof typeof EnumSessionType;
export const sessionTypeKeys = Object.values(EnumSessionType).filter(key => typeof key === 'string');

export enum EnumServiceType {
  ACADEMICO = 'Académico',
  CONDUCTUAL = 'Conductual',
  EMOCIONAL = 'Emocional',
  VOCACIONAL = 'Vocacional',
  OTRO = 'Otro',
}

export type TService = keyof typeof EnumServiceType;
export const serviceTypeKeys = Object.values(EnumServiceType).filter(key => typeof key === 'string');

export const sessionTypeValue = (value: string): EnumSessionType => {
  switch (value) {
    case EnumSessionType.ENTREVISTA_DOCENTE:
      return EnumSessionType.ENTREVISTA_DOCENTE;
    case EnumSessionType.ENTREVISTA_PADRES_DE_FAMILIA:
      return EnumSessionType.ENTREVISTA_PADRES_DE_FAMILIA;
    default:
      return EnumSessionType.SESSION_INDIVIDUAL;
  }
};

export const serviceTypeValue = (value: string): EnumServiceType => {
  switch (value) {
    case EnumServiceType.ACADEMICO:
      return EnumServiceType.ACADEMICO;
    case EnumServiceType.CONDUCTUAL:
      return EnumServiceType.CONDUCTUAL;
    case EnumServiceType.EMOCIONAL:
      return EnumServiceType.EMOCIONAL;
    case EnumServiceType.VOCACIONAL:
      return EnumServiceType.VOCACIONAL;
    default:
      return EnumServiceType.OTRO;
  }
};
