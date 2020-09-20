import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EResponsibleRelationship, relationshipKeys, TRelationship } from '@students/constants/student.constant';
import { StudentDto } from '../student.dto';

export class BulkStudentDto extends StudentDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  readonly responsibleFirstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  readonly responsibleLastname!: string;

  @ApiProperty({ type: String })
  @IsEnum(EResponsibleRelationship, {
    message: `responsibleRelationship: Debe ser uno de los siguientes valores: ${relationshipKeys}`,
  })
  readonly responsibleRelationship!: TRelationship;

  @IsEmail({}, { message: validator.isEmail })
  @MaxLength(128, { message: validator.maxLength })
  readonly responsibleEmail!: string;

  @IsNumberString({}, { message: validator.isNumberString })
  @MinLength(8, { message: validator.minLength })
  @MaxLength(8, { message: validator.maxLength })
  readonly responsiblePhone!: string;
}
