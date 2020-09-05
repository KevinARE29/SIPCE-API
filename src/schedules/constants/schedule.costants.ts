export enum EnumEventType {
  'Sesión con estudiante' = 1,
  'Entrevista con docente titular',
  'Entrevista con padres de familia',
  'Programa de Intervención',
  'Otro',
}

export const schedulesValues = Object.values(EnumEventType).filter(key => typeof key === 'number');
export const schedulesKeys = Object.values(EnumEventType).filter(key => typeof key === 'string');
export type TSchedule = keyof typeof EnumEventType;
