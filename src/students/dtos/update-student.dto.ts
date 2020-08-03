import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsEnum,
  IsArray,
  IsPositive,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EStudentStatus, TStatus, statusKeys } from '@students/constants/student.constant';

export class UpdateStudentDto {
  @IsOptional()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname?: string;

  @IsOptional()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname?: string;

  @IsOptional()
  @IsEmail({}, { message: validator.isEmail })
  email?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  birthdate?: Date;

  @IsOptional()
  @IsId()
  shiftId?: number;

  @IsOptional()
  @IsId()
  gradeId?: number;

  @IsOptional()
  @IsId()
  sectionId?: number;

  @IsOptional()
  @IsId()
  startedGradeId?: number;

  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  registrationYear?: number;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsEnum(EStudentStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${statusKeys}`,
  })
  status?: TStatus;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  siblings?: number[];
}
