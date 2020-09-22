import { Expose } from 'class-transformer';

export class Period {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}
