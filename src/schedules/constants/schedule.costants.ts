export enum EnumEventType {
    'Sesión estudiante' = 1,
    'Entrevista con docente titular',
    'Entrevista con padres de familia',
    'Otros',
  }
  
  export const schedulesValues = Object.values(EnumEventType).filter(key => typeof key === 'number');
  export const schedulesKeys = Object.values(EnumEventType).filter(key => typeof key === 'string');
  export type TSchedule = keyof typeof EnumEventType;
  