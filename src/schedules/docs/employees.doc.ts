import { Expose, Type } from 'class-transformer';
import { User } from './user.doc';

export class SEmployees {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => User)
  employees!: User;

  
}
