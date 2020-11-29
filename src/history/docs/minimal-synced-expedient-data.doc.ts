import { Expose } from 'class-transformer';

export class MinimalSyncedExpedientData {
  @Expose()
  finalConclusion!: string;

  @Expose()
  author!: string;

  @Expose()
  grade!: string;
}
