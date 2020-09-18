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

export const eventsColors = ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#00A5D0', '#00B4D8', '#58B4D1'];
