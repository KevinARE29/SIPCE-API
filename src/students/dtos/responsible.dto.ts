import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsEnum, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EResponsibleRelationship, relationshipKeys, TRelationship } from '@students/constants/student.constant';

export class ResponsibleDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(64, { message: validator.maxLength })
  lastname!: string;

  @ApiProperty({ type: String })
  @IsEnum(EResponsibleRelationship, {
    message: `responsibleRelationship: Debe ser uno de los siguientes valores: ${relationshipKeys}`,
  })
  relationship!: TRelationship;

  @IsEmail({}, { message: validator.isEmail })
  @MaxLength(128, { message: validator.maxLength })
  email!: string;

  @IsNumberString({}, { message: validator.isString })
  @MinLength(8, { message: validator.minLength })
  @MaxLength(8, { message: validator.maxLength })
  phone!: string;
}
