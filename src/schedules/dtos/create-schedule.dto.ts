import { IsArray, IsOptional, IsEnum, IsNotEmptyObject } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import { EnumEventType, schedulesKeys, TSchedule } from '@schedules/constants/schedule.costants';
import { IsId } from '@core/decorators/id.decorator';

export class CreateScheduleDto {
  @ApiProperty({ type: String })
  @IsEnum(EnumEventType, {
    message: `EnumEventType: Debe ser uno de los siguientes valores: ${schedulesKeys}`,
  })
  readonly eventType!: TSchedule;

  @IsNotEmptyObject({ message: validator.isNotEmpty })
  readonly jsonData!: Record<string, any>;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly participantIds?: number[];

  @IsOptional()
  @IsId()
  readonly studentId?: number;
}
