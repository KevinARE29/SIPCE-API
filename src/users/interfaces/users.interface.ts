export interface IAuthenticatedUser {
  id: number;
  username: string;
  email: string;
  permissions: number[];
}
