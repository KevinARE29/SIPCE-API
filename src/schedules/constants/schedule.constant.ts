export enum ESchedule {
  'Lunes' = 1,
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
}

export const scheduleValues = Object.values(ESchedule).filter(key => typeof key === 'number');
export const scheduleDayKeys = Object.values(ESchedule).filter(key => typeof key === 'string');
export type TSchedules = keyof typeof ESchedule;
