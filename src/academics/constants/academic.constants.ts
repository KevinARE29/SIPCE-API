export enum ESchoolYearStatus {
  'En proceso de apertura' = 1,
  'En curso',
  'Histórico',
}

export const activeSchoolYearStatus = [1, 2];
export const yearStatusValues = Object.values(ESchoolYearStatus).filter(key => typeof key === 'number');
export const yearStatusKeys = Object.values(ESchoolYearStatus).filter(key => typeof key === 'string');
export type TYearStatus = keyof typeof ESchoolYearStatus;
