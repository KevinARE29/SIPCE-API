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
  IsNumberString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EResponsibleRelationship, relationshipKeys, TRelationship } from '@students/constants/student.constant';

export class StudentDto {
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

  @IsId()
  readonly gradeId!: number;

  @IsOptional()
  @IsId()
  readonly startedGradeId?: number;

  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  readonly registrationYear?: number;

  @IsDateString({ message: validator.isDateString })
  readonly birthdate!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly responsibleFirstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly responsibleLastname!: string;

  @ApiProperty({ type: String })
  @IsEnum(EResponsibleRelationship, {
    message: `responsibleRelationship: Debe ser uno de los siguientes valores: ${relationshipKeys}`,
  })
  readonly responsibleRelationship!: TRelationship;

  @IsEmail({}, { message: validator.isEmail })
  readonly responsibleEmail!: string;

  @IsNumberString({}, { message: validator.isNumberString })
  readonly responsiblePhone!: string;
}
