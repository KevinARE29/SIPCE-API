import { Expose, Type } from 'class-transformer';
import { BaseUser } from '@core/docs/base-user.doc';

export class ActionLogs {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => BaseUser)
  user!: BaseUser;

  @Expose()
  action!: string;

  @Expose()
  endpoint!: string;

  @Expose()
  statusCode!: number;

  @Expose()
  attemptTime!: Date;
}
