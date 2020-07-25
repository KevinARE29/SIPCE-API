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
  'Madre' = 1,
  'Padre',
  'Tía',
  'Tío',
  'Abuelo',
  'Abuela',
  'Padrino',
  'Madrina',
  'Madrastra',
  'Padrastro',
  'Hermano',
  'Hermana',
  'Primo',
  'Prima',
  'Tutor',
}

export const relationshipValues = Object.values(EResponsibleRelationship).filter(key => typeof key === 'number');
export const relationshipKeys = Object.values(EResponsibleRelationship).filter(key => typeof key === 'string');
export type TRelationship = keyof typeof EResponsibleRelationship;
