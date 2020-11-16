import { Expose } from 'class-transformer';

export class Session {
  @Expose()
  id!: number;

  @Expose()
  sessionType!: string;

  @Expose()
  serviceType!: string;

  @Expose()
  startedAt!: Date;

  @Expose()
  duration!: number;

  @Expose()
  comments!: string;

  @Expose()
  treatedTopics!: string[];

  @Expose()
  agreements!: string;

  @Expose()
  startHour!: string;

  @Expose()
  draft!: boolean;
}
