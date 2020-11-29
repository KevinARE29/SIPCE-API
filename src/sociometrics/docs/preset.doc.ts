import { Expose } from 'class-transformer';

export class Preset {
  @Expose()
  id!: number;

  @Expose()
  password!: string;

  @Expose()
  startedAt!: Date;

  @Expose()
  endedAt!: Date;
}
