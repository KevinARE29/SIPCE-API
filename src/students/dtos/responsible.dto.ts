import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString, IsEmail, IsNumberString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EResponsibleRelationship, relationshipKeys, TRelationship } from '@students/constants/student.constant';

export class ResponsibleDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname!: string;

  @ApiProperty({ type: String })
  @IsEnum(EResponsibleRelationship, {
    message: `responsibleRelationship: Debe ser uno de los siguientes valores: ${relationshipKeys}`,
  })
  relationship!: TRelationship;

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsNumberString({}, { message: validator.isString })
  phone!: string;
}
