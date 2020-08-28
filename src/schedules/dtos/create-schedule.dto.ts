import { IsString, IsArray, IsInt, IsPositive, IsOptional, IsEmail, IsNotEmpty, IsDate, IsMilitaryTime, IsJSON } from 'class-validator';
import { validator } from '@core/messages/validator.message';


export class CreateScheduleDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDate({ message: validator.isDateString })
  day!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDate({ message: validator.isDateString })
  startTime!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDate({ message: validator.isDateString })
  endTime!: Date;

  @IsNotEmpty({ message: validator.isString })
  @IsJSON()
  subject!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsJSON()
  jsonData!: Record<string, any>;

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  participantIds?: number[];


}
