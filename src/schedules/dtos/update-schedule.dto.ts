import { IsArray, IsInt, IsPositive, IsOptional, IsEnum, IsObject } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import { EnumEventType, schedulesKeys, TSchedule } from '@schedules/constants/schedule.costants';
import { IsId } from '@core/decorators/id.decorator';

export class UpdateScheduleDto {
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
