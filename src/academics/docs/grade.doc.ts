import { Expose } from 'class-transformer';

export class Grade {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}
