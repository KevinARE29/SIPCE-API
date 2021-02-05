import { Period } from '@academics/docs/period.doc';
import { Fouls } from '@fouls/docs/fouls.doc';
import { Sanctions } from '@sanctions/docs/sanctions.doc';
import { Expose, Type } from 'class-transformer';

export class FoulSanctionAssignation {
  @Expose()
  id!: number;

  @Expose()
  issueDate!: Date;

  @Expose()
  createdAt!: Date;

  @Type(() => Fouls)
  @Expose({ name: 'foulId' })
  foul!: Fouls;

  @Type(() => Sanctions)
  @Expose({ name: 'sanctionId' })
  sanction!: Sanctions;

  @Type(() => Period)
  @Expose({ name: 'periodId' })
  period!: Period;
}
