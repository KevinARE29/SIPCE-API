export interface IEmail {
  to: string | string[];
  template: string;
  subject: string;
  context: object;
}
