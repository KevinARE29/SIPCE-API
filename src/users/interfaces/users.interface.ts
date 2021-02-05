export interface IAuthenticatedUser {
  id: number;
  sub: string;
  email: string;
  permissions: number[];
}
