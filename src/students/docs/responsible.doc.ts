import { Expose } from 'class-transformer';

export class Responsible {
  @Expose()
  id!: number;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  email!: string;

  @Expose()
  phone!: string;

  @Expose()
  relationship!: string;
}
