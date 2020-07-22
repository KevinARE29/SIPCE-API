import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMilitaryTime, IsEnum } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ESchedule, scheduleValues } from '@schedules/constants/schedule.constant';

export class ScheduleCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEnum(ESchedule, {
    message: `day: Debe ser uno de los siguientes valores: ${scheduleValues}`,
  })
  day!: number;

  @ApiProperty()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsMilitaryTime({ message: validator.isDateString })
  startTime!: Date;

  @ApiProperty()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsMilitaryTime({ message: validator.isDateString })
  endTime!: Date;
}
