import { Expose, Type } from 'class-transformer';
import { Responsible } from './responsible.doc';

export class ResponsibleStudent {
  @Expose()
  relationship!: string;

  @Expose()
  @Type(() => Responsible)
  responsible!: Responsible[];
}
