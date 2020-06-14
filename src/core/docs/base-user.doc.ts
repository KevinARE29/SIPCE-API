import { Expose } from 'class-transformer';

export class BaseUser {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;
}
