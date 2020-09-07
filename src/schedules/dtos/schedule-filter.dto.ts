import { IsDateString, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class ScheduleFilterDto {
  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  fromDate?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  toDate?: Date;
}
