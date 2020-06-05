export interface ITokenPayload {
  id: number;
  sub: string;
  email: string;
  permissions: number[];
  iat?: number;
  exp?: number;
}
