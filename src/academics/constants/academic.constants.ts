export enum ESchoolYearStatus {
  'En proceso de apertura' = 1,
  'En curso',
  'Histórico',
}

export const activeSchoolYearStatus = [1, 2];
export const yearStatusValues = Object.values(ESchoolYearStatus).filter(key => typeof key === 'number');
export const yearStatusKeys = Object.values(ESchoolYearStatus).filter(key => typeof key === 'string');
export type TYearStatus = keyof typeof ESchoolYearStatus;

export type TCounselorAssignation = { shiftId: number; grades: number[] }[];

export enum EPeriodCode {
  Primer = 'p1',
  Segundo = 'p2',
  Tercer = 'p3',
  Cuarto = 'p4',
}

export type TPeriod = keyof typeof EPeriodCode;
