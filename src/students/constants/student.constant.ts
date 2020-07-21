export enum EStudentStatus {
  'Aprobado' = 1,
  'Repetidor',
  'Reprobado',
  'Egresado',
  'Expulsado',
  'Desertor',
}

export const statusValues = Object.values(EStudentStatus).filter(key => typeof key === 'number');

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
