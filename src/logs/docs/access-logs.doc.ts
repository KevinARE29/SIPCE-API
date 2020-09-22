import { Expose } from 'class-transformer';

export class AccessLogs {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Expose()
  ip!: string;

  @Expose()
  statusCode!: number;

  @Expose()
  attemptTime!: Date;
}
