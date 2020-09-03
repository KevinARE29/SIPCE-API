import { Expose, Type } from 'class-transformer';
import { ScheduleUser } from './schedule-user.doc';
import { UserSchedule } from './user.doc';
import { ScheduleStudent } from './student.doc';
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
  eventType!: string;

  @Expose()
  recurrent!: boolean;

  @Expose()
  jsonData!:Record<string, any>;


  @Expose()
  @Type(() => ScheduleUser)
  ownerSchedule!: ScheduleUser;
  
  @ApiProperty({ type: [UserSchedule] })
  @Expose()
  @Type(() => UserSchedule)
  employeesSchedule!: UserSchedule[];
  
  @ApiProperty({ type: [ScheduleStudent] })
  @Expose()
  @Type(() => ScheduleStudent)
  studentSchedule!: ScheduleStudent;

  
}
