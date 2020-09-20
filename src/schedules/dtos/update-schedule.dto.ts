import { IsArray, IsOptional, IsEnum, IsObject } from 'class-validator';
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
  readonly eventType?: TSchedule;

  @IsOptional()
  @IsObject()
  readonly jsonData?: Record<string, any>;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly participantIds?: number[];

  @IsOptional()
  @IsId()
  readonly studentId?: number;
}
