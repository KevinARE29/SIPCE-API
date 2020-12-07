import { Expose } from 'class-transformer';

export class UserPermission {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  codename!: string;
}
