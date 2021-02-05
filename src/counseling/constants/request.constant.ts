export enum ERequestStatus {
  'Creada' = 1,
  'Verificada',
  'Aceptada',
  'Cancelada',
}

export const requestStatusValues = Object.values(ERequestStatus).filter(key => typeof key === 'number');
export const requestStatusKeys = Object.values(ERequestStatus).filter(key => typeof key === 'string');
export type TRequestStatus = keyof typeof ERequestStatus;
