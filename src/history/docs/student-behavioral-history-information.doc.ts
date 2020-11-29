import { Expose, Type } from 'class-transformer';
import { MinimalSyncedExpedientData } from './minimal-synced-expedient-data.doc';

export class StudentBehavioralHistoryInformation {
  @Expose()
  id!: number;

  @Expose()
  finalConclusion!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  author!: string;

  @Expose()
  behavioralHistoryGrade!: string;

  @Expose()
  behavioralHistoryYear!: number;

  @Expose()
  foulsCounter!: number;

  @Expose()
  @Type(() => MinimalSyncedExpedientData)
  expedients!: MinimalSyncedExpedientData[];
}
