import { Expose } from 'class-transformer';

export class AssignedUser {
  @Expose()
  id!: number;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;
}
