import { Expose } from 'class-transformer';

export class Sections {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
