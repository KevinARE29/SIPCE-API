export enum EStudentStatus {
  'Cursando año escolar' = 1,
  'Aprobado',
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

export type TRelationship = keyof typeof EResponsibleRelationship;
