export enum EStudentStatus {
  'Aprobado' = 1,
  'Desertor',
  'Egresado',
  'Expulsado',
  'Repetidor',
  'Reprobado',
}

export const activeStatuses = [1, 5];
export const inactiveStatuses = [2, 3, 4, 6];

export const statusValues = Object.values(EStudentStatus).filter(key => typeof key === 'number');
export const statusKeys = Object.values(EStudentStatus).filter(key => typeof key === 'string');
export type TStatus = keyof typeof EStudentStatus;

export enum EResponsibleRelationship {
  'Abuela' = 1,
  'Abuelo',
  'Hermana',
  'Hermano',
  'Madrastra',
  'Madre',
  'Madrina',
  'Padrastro',
  'Padre',
  'Padrino',
  'Prima',
  'Primo',
  'Tía',
  'Tío',
  'Tutor',
}

export const relationshipValues = Object.values(EResponsibleRelationship).filter(key => typeof key === 'number');
export const relationshipKeys = Object.values(EResponsibleRelationship).filter(key => typeof key === 'string');
export type TRelationship = keyof typeof EResponsibleRelationship;
