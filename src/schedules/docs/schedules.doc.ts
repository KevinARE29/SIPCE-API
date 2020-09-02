import { Expose, Type } from 'class-transformer';

import { ScheduleUser } from './schedule-user.doc';
import { UserSchedule } from './user.doc';
import { ScheduleStudent } from './student.doc';
import { EventSchedule } from './event.doc';
import { ApiProperty } from '@nestjs/swagger';

export class Schedule {

  @Expose()
  id!: number;

  @Expose()
  day!: Date;

  @Expose()
  startTime!: Date;

  @Expose()
  endTime!: Date;

  @Expose()
  jsonData!:Record<string, any>;


  @Expose()
  @Type(() => ScheduleUser)
  ownerSchedule!: ScheduleUser;
  
  @Expose()
  @Type(() => EventSchedule)
  eventConflict!: EventSchedule[];
  
  @ApiProperty({ type: [UserSchedule] })
  @Expose()
  @Type(() => UserSchedule)
  employeesSchedule!: UserSchedule[];
  
  @ApiProperty({ type: [ScheduleStudent] })
  @Expose()
  @Type(() => ScheduleStudent)
  studentSchedule!: ScheduleStudent;

  
}
