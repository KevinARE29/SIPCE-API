import { Period } from '@academics/docs/period.doc';
import { Fouls } from '@fouls/docs/fouls.doc';
import { ApiProperty } from '@nestjs/swagger';
import { Sanctions } from '@sanctions/docs/sanctions.doc';
import { Expose, Type } from 'class-transformer';

export class FoulSanctionAssignation {
  @Expose()
  id!: number;

  @Expose()
  issueDate!: Date;

  @ApiProperty({ type: [Fouls] })
  @Type(() => Fouls)
  @Expose()
  foul!: Fouls;

  @ApiProperty({ type: [Sanctions] })
  @Type(() => Sanctions)
  @Expose()
  sanction?: Sanctions;

  @ApiProperty({ type: [Period] })
  @Type(() => Period)
  @Expose()
  period!: Period;
}
