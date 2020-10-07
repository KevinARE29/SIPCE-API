export interface IConfirmationTokenPayload {
  email: string;
  requestId: number;
  iat?: number;
  exp?: number;
}
