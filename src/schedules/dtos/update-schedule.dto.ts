import { IsString, IsArray, IsInt, IsPositive, IsOptional, IsNotEmpty, IsEnum, IsDateString, IsObject, IsBooleanString, IsBoolean } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import { EnumEventType, schedulesKeys, TSchedule } from '@schedules/constants/schedule.costants';
import { IsId } from '@core/decorators/id.decorator';



export class UpdateScheduleDto {
  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  day?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  startTime?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  endTime?: Date;

  @IsOptional()
  @IsString({ message: validator.isString })
  subject?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  description?: string;
  

  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  recurrent?: boolean;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsEnum(EnumEventType, {
    message: `EnumEventType: Debe ser uno de los siguientes valores: ${schedulesKeys}`,
  })
  eventType?: TSchedule;

  @IsOptional()
  @IsObject()
  jsonData?: Record<string, any>;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  participantIds?: number[];

  @IsOptional()
  @IsId()
  studentId?: number;

  


}
