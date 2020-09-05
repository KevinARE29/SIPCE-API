import { IsInt, IsPositive, IsDateString, Min, Max } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class StartSchoolYearDto {
  @Min(new Date().getFullYear(), { message: validator.isMin })
  @Max(new Date().getFullYear() + 1, { message: validator.isMax })
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  year!: number;

  @IsDateString({ message: validator.isDateString })
  startDate!: Date;

  @IsDateString({ message: validator.isDateString })
  endDate!: Date;
}
