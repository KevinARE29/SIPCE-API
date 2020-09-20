import { Expose } from 'class-transformer';

export class Section {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
