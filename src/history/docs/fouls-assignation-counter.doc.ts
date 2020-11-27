import { Expose, Type } from 'class-transformer';
import { FoulsCounter } from './fouls-counter.doc';

export class FoulsAssignationCounter {
  @Expose()
  period!: string;

  @Expose()
  @Type(() => FoulsCounter)
  foulsCounter!: FoulsCounter;
}
