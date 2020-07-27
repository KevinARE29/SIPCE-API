import { Expose } from 'class-transformer';

export class Responsibles {
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
