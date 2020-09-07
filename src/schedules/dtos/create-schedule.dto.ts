import {
  IsString,
  IsArray,
  IsInt,
  IsPositive,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsNotEmptyObject,
} from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import { EnumEventType, schedulesKeys, TSchedule } from '@schedules/constants/schedule.costants';
import { IsId } from '@core/decorators/id.decorator';

export class CreateScheduleDto {
  @ApiProperty({ type: String })
  @IsEnum(EnumEventType, {
    message: `EnumEventType: Debe ser uno de los siguientes valores: ${schedulesKeys}`,
  })
  eventType!: TSchedule;

  @IsNotEmptyObject({ message: validator.isNotEmpty })
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
