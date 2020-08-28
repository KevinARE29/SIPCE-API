export enum EnumEventType {
    'Sesión estudiante' = 1,
    'Entrevista con docente titular',
    'Entrevista con padres de familia',
    'Otro'
  }
  
  export const statusValues = Object.values(EnumEventType).filter(key => typeof key === 'number');
  export const statusKeys = Object.values(EnumEventType).filter(key => typeof key === 'string');
  export type TStatus = keyof typeof EnumEventType;
  