export enum EStudentStatus {
  'Aprobado' = 1,
  'Cursando Año Escolar',
  'Desertor',
  'Egresado',
  'Expulsado',
  'Repetidor',
  'Reprobado',
}

export const activeStatuses = [1, 2, 6];
export const inactiveStatuses = [3, 4, 5, 7];

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
