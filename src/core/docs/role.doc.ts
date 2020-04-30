import { Expose } from 'class-transformer';

export class BaseRole {
  @Expose()
  name!: string;
}
