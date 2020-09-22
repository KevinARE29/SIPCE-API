import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsInt,
  IsPositive,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class StudentDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MinLength(8, { message: validator.minLength })
  @MaxLength(8, { message: validator.maxLength })
  readonly code!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  readonly firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  readonly lastname!: string;

  @IsEmail({}, { message: validator.isEmail })
  @MaxLength(128, { message: validator.maxLength })
  readonly email!: string;

  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  readonly registrationYear?: number;

  @IsDateString({ message: validator.isDateString })
  readonly birthdate!: Date;

  @IsId()
  readonly gradeId!: number;

  @IsOptional()
  @IsId()
  readonly startedGradeId?: number;
}
