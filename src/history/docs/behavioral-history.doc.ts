import { Expose } from 'class-transformer';

export class BehavioralHistory {
  @Expose()
  id!: number;

  @Expose()
  finalConclusion!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
