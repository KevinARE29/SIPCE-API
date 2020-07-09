import { Expose } from 'class-transformer';

export class UserRole {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
