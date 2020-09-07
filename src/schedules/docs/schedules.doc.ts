import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUser } from '@core/docs/base-user.doc';
import { ScheduleStudent } from './student.doc';

export class Schedule {
  @Expose()
  id!: number;

  @Expose()
  eventType!: string;

  @Expose()
  jsonData!: Record<string, any>;

  @ApiProperty({ type: [BaseUser] })
  @Expose()
  @Type(() => BaseUser)
  employeesSchedule!: BaseUser[];

  @ApiProperty({ type: ScheduleStudent })
  @Expose()
  @Type(() => ScheduleStudent)
  studentSchedule!: ScheduleStudent;
}
