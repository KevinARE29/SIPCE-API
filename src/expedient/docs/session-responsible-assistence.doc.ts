import { Expose, Type } from 'class-transformer';
import { Responsible } from '@students/docs/responsible.doc';

export class SessionResponsibleAssistence {
  @Expose()
  responsible1Assistence?: boolean;

  @Expose()
  responsible2Assistence?: boolean;

  @Expose()
  otherResponsibleName?: string;

  @Expose()
  otherResponsibleRelationship?: string;

  @Type(() => Responsible)
  @Expose()
  responsible1?: Responsible;

  @Type(() => Responsible)
  @Expose()
  responsible2?: Responsible;
}
