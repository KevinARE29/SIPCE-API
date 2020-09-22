import { Expose } from 'class-transformer';

export class Roles {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  usersCount!: number;
}
