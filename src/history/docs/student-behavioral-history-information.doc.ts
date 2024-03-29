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
  authorId!: number;

  @Expose()
  author!: string;

  @Expose()
  behavioralHistoryGrade!: string;

  @Expose()
  behavioralHistoryYear!: number;

  @Expose()
  foulsAlert!: boolean;

  @Expose()
  editable!: boolean;

  @Expose()
  @Type(() => MinimalSyncedExpedientData)
  expedients!: MinimalSyncedExpedientData[];
}
