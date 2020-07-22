export enum ESchoolYearStatus {
  'En proceso de apertura' = 1,
  'En curso',
  'Histórico',
}

export const yearStatusValues = Object.values(ESchoolYearStatus).filter(key => typeof key === 'number');
