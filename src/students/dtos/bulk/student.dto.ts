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
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { EResponsibleRelationship, relationshipKeys, TRelationship } from '@students/constants/student.constant';

export class StudentDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  code!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname!: string;

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsId()
  gradeId!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  startedGradeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  registrationYear?: number;

  @IsDateString()
  birthdate!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  responsibleFirstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  responsibleLastname!: string;

  @ApiProperty({ type: String })
  @IsEnum(EResponsibleRelationship, {
    message: `responsibleRelationship: Debe ser uno de los siguientes valores: ${relationshipKeys}`,
  })
  responsibleRelationship!: TRelationship;

  @IsEmail({}, { message: validator.isEmail })
  responsibleEmail!: string;

  @IsNumberString({}, { message: validator.isNumberString })
  responsiblePhone!: string;
}
