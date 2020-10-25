import { Expose, Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUser } from '@core/docs/base-user.doc';
import { EnumEventType } from '@schedules/constants/schedule.constants';
import { ScheduleStudent } from './student.doc';

export class Schedule {
  @Expose()
  id!: number;

  @Expose()
  @Transform(eventType => EnumEventType[eventType])
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
