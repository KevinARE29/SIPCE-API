export enum EnumSessionType {
  SESSION_INDIVIDUAL = 'Sesión individual',
  ENTREVISTA_DOCENTE = 'Entrevista con docente',
  ENTREVISTA_PADRES_DE_FAMILIA = 'Entrevista con padres de familia',
}

export type TSession = keyof typeof EnumSessionType;
export const sessionTypeKeys = Object.values(EnumSessionType).filter(key => typeof key === 'string');
export type TSessionValues = typeof EnumSessionType[TSession];

export enum EnumServiceType {
  ACADEMICO = 'Académico',
  CONDUCTUAL = 'Conductual',
  EMOCIONAL = 'Emocional',
  VOCACIONAL = 'Vocacional',
  OTRO = 'Otro',
}

export type TService = keyof typeof EnumServiceType;
export const serviceTypeKeys = Object.values(EnumServiceType).filter(key => typeof key === 'string');
export type TServiceValues = typeof EnumServiceType[TService];

export enum ESessionReport {
  REPORTE_POR_TIPOS_DE_SESIÓN = 'session_type',
  REPORTE_POR_TIPOS_DE_SERVICIO = 'service_type',
}

export type TSessionReport = keyof typeof ESessionReport;
export const sessionReportKeys = Object.values(ESessionReport).filter(key => typeof key === 'string');
export type TSessionReportalues = typeof ESessionReport[TSessionReport];
