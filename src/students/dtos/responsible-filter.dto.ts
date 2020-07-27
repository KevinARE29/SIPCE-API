import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsEnum } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';
import { EResponsibleRelationship, relationshipKeys, TRelationship } from '@students/constants/student.constant';

const sortOptions = getSortOptions('firstname', 'lastname', 'email', 'phone', 'relationship');
export const sortOptionsMap = getSortOptionsMap('responsible', sortOptions)
  .set('relationship-asc', { 'responsibleStudent.relationship': 'ASC' })
  .set('relationship-desc', { 'responsibleStudent.relationship': 'DESC' });

export class ResponsibleFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  firstname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  lastname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  email?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  phone?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEnum(EResponsibleRelationship, {
    message: `responsibleRelationship: Debe ser uno de los siguientes valores: ${relationshipKeys}`,
  })
  relationship!: TRelationship;
}
