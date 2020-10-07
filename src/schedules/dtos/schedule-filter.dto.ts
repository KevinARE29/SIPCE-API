import { IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class ScheduleFilterDto {
  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly fromDate?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly toDate?: Date;

  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  readonly notification?: boolean;
}
