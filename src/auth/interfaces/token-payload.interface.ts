export interface ITokenPayload {
  sub: string;
  email: string;
  permissions: number[];
  iat?: number;
  exp?: number;
}
