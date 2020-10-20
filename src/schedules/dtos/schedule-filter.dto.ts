import { IsBooleanString, IsDateString, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class ScheduleFilterDto {
  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly fromDate?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly toDate?: Date;

  @IsOptional()
  @IsBooleanString({ message: validator.isBoolean })
  readonly notification?: boolean;
}
