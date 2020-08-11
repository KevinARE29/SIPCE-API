import { IsInt, IsPositive, IsDateString, Min } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class StartSchoolYearDto {
  @Min(new Date().getFullYear(), { message: validator.isMin })
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  year!: number;

  @IsDateString({ message: validator.isDateString })
  startDate!: Date;

  @IsDateString({ message: validator.isDateString })
  endDate!: Date;
}
