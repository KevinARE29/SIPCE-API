import { Expose } from 'class-transformer';

export class BaseUser {
  @Expose()
  id!: number;

  @Expose()
  code!: string;

  @Expose()
  username!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  email!: string;
}
