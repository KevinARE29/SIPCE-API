import { IsString, IsArray, IsInt, IsPositive, IsOptional, IsNotEmpty, IsEnum, IsDateString, IsObject, IsBooleanString, isBoolean, IsBoolean } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import { EnumEventType, schedulesKeys, TSchedule } from '@schedules/constants/schedule.costants';
import { IsId } from '@core/decorators/id.decorator';



export class CreateScheduleDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDateString({ message: validator.isDateString })
  day!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDateString({ message: validator.isDateString })
  startTime!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDateString({ message: validator.isDateString })
  endTime!: Date;

  @IsNotEmpty({ message: validator.isString })
  @IsString()
  subject!: string;

  @IsNotEmpty({ message: validator.isString })
  @IsString()
  description!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsBoolean({ message: validator.isBoolean })
  recurrent!: boolean;

  @ApiProperty({ type: String })
  @IsEnum(EnumEventType, {
    message: `EnumEventType: Debe ser uno de los siguientes valores: ${schedulesKeys}`,
  })
  eventType!: TSchedule;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsObject()
  jsonData!: Record<string, any>;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  participantIds?: number[];

  @IsOptional()
  @IsId()
  studentId?: number;

  


}
