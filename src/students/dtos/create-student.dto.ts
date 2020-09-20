import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  IsNotEmptyObject,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';
import { IsDto } from '@core/decorators/is-dto.decorator';
import { ResponsibleDto } from './responsible.dto';

export class CreateStudentDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly code!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly lastname!: string;

  @IsEmail({}, { message: validator.isEmail })
  readonly email!: string;

  @IsDateString({ message: validator.isDateString })
  readonly birthdate!: Date;

  @IsId()
  readonly shiftId!: number;

  @IsId()
  readonly gradeId!: number;

  @IsOptional()
  @IsId()
  readonly startedGradeId?: number;

  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  readonly registrationYear?: number;

  @IsNotEmptyObject()
  @IsDto(ResponsibleDto)
  readonly responsible!: ResponsibleDto;
}
