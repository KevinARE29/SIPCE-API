import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsEnum } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';
import {
  EnumServiceType,
  EnumSessionType,
  ESessionReport,
  serviceTypeKeys,
  sessionReportKeys,
  sessionTypeKeys,
  TServiceValues,
  TSessionReportalues,
  TSessionValues,
} from '@expedient/constants/session.constants';

export class SessionsReportFilterDto {
  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly shiftId?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly cycleId?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly gradeId?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly counselorId?: number;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly startedAt?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly finishedAt?: Date;

  @ApiPropertyOptional({ enum: EnumSessionType })
  @IsOptional()
  @IsEnum(EnumSessionType, {
    message: `sessionType: Debe ser uno de los siguientes valores: ${sessionTypeKeys}`,
  })
  readonly sessionType?: TSessionValues;

  @ApiPropertyOptional({ enum: EnumServiceType })
  @IsOptional()
  @IsEnum(EnumServiceType, {
    message: `serviceType: Debe ser uno de los siguientes valores: ${serviceTypeKeys}`,
  })
  readonly serviceType?: TServiceValues;

  @ApiProperty({ enum: ESessionReport })
  @IsEnum(ESessionReport, {
    message: `reportType: Debe ser uno de los siguientes valores: ${sessionReportKeys}`,
  })
  readonly reportType!: TSessionReportalues;
}
