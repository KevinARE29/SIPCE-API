import { Expose } from 'class-transformer';

export class SessionsReport {
  @Expose()
  shift!: string;

  @Expose()
  cycle!: string;

  @Expose()
  grade!: string;

  @Expose()
  counselor!: string;

  @Expose()
  sessionType!: string;

  @Expose()
  serviceType!: string;

  @Expose()
  count!: number;
}
