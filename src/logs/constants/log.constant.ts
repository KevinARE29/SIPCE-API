export enum EActions {
  'Actualizar' = 1,
  'Consultar',
  'Crear',
  'Eliminar',
}

export const actionValues = Object.values(EActions).filter(key => typeof key === 'number');

export enum EMethods {
  'PUT' = 1,
  'PATCH' = 1,
  'GET' = 2,
  'POST' = 3,
  'DELETE' = 4,
}

export type TMethods = keyof typeof EMethods;

export const excludedUrls = [
  'auth/login',
  'auth/logout',
  'auth/refresh-token',
  'auth/forgot-password',
  'auth/reset-password',
  'auth/politics',
  'auth/permissions',
  'users/me/password',
  'logs/access-logs',
  'logs/action-logs',
];
