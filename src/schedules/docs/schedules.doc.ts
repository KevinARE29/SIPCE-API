import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleUser } from './schedule-user.doc';
import { SEmployees } from './employees.doc';
import { SStudents } from './students.doc';
import { SEvent } from './event.doc';

export class Schedule {

  @ApiProperty({ type: ScheduleUser })
  
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
  @Type(() => SEvent)
  eventConflict!: SEvent[];

  @Expose()
  @Type(() => SEmployees)
  employeesSchedule!: SEmployees[];

  @Expose()
  @Type(() => SStudents)
  studentSchedule!: SStudents[];

  
}
