import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDateString,
  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ResponsibleDto } from './responsible.dto';

export class CreateStudentDto {
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

  @IsDateString()
  birthdate!: Date;

  @IsId()
  shiftId!: number;

  @IsId()
  gradeId!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsId()
  startedGradeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsId()
  registrationYear?: number;

  @ApiProperty({ type: ResponsibleDto })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ResponsibleDto)
  responsible!: ResponsibleDto;
}
