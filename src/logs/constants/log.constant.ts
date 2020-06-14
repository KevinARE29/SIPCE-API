export enum EActions {
  'Crear' = 1,
  'Consultar',
  'Actualizar',
  'Eliminar',
}

export enum EMethods {
  'POST' = 1,
  'GET' = 2,
  'PUT' = 3,
  'PATCH' = 3,
  'DELETE' = 4,
}

export type TMethods = keyof typeof EMethods;

export const excludedUrls = [
  'auth/login',
  'auth/logout',
  'auth/refresh-token',
  'auth/forgot-password',
  'auth/reset-password',
  'users/me/password',
];
