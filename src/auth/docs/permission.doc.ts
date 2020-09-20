import { Expose } from 'class-transformer';

export class Permission {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  codename!: string;
}
