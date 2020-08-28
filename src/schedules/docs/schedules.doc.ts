import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleUser } from './schedule-user.doc';


export class Schedule {
  @Expose()
  day!: Date;

  @Expose()
  startTime!: Date;

  @Expose()
  endTime!: Date;

  @Expose()
  jsonData!:Record<string, any>;


  @ApiProperty({ type: ScheduleUser })
  @Type(() => ScheduleUser)
  @Expose()
  user!: ScheduleUser;

}
