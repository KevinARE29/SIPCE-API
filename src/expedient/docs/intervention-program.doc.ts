import { Expose } from 'class-transformer';

export class InterventionProgram {
  @Expose()
  id!: number;

  @Expose()
  name!: number;

  @Expose()
  description!: number;

  @Expose()
  type!: string;

  @Expose()
  status!: boolean;
}
