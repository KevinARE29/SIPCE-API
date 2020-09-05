import { Expose } from 'class-transformer';

export class UserSchedule {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  code!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  email!: string;
}
