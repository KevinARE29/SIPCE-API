export enum ESchedule {
  'Lunes' = 1,
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
}

export const actionValues = Object.values(ESchedule).filter(key => typeof key === 'number');
