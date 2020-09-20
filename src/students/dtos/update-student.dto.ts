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
  readonly firstname?: string;

  @IsOptional()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly lastname?: string;

  @IsOptional()
  @IsEmail({}, { message: validator.isEmail })
  readonly email?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly birthdate?: Date;

  @IsOptional()
  @IsId()
  readonly shiftId?: number;

  @IsOptional()
  @IsId()
  readonly gradeId?: number;

  @IsOptional()
  @IsId()
  readonly sectionId?: number;

  @IsOptional()
  @IsId()
  readonly startedGradeId?: number;

  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  readonly registrationYear?: number;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsEnum(EStudentStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${statusKeys}`,
  })
  readonly status?: TStatus;

  @IsOptional()
  @IsArray()
  @IsId({ each: true })
  readonly siblings?: number[];
}
