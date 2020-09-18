import { validator } from '@core/messages/validator.message';
import { IsString, IsEmail, IsNumberString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EResponsibleRelationship, relationshipKeys, TRelationship } from '@students/constants/student.constant';

export class UpdateResponsibleDto {
  @IsOptional()
  @IsString({ message: validator.isString })
  firstname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  lastname?: string;

  @IsOptional()
  @ApiProperty({ type: String })
  @IsEnum(EResponsibleRelationship, {
    message: `responsibleRelationship: Debe ser uno de los siguientes valores: ${relationshipKeys}`,
  })
  relationship?: TRelationship;

  @IsOptional()
  @IsEmail({}, { message: validator.isEmail })
  email?: string;

  @IsOptional()
  @IsNumberString({}, { message: validator.isString })
  phone?: string;
}
