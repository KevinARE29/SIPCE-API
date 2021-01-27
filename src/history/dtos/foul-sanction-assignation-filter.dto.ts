import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsDateString, IsString, IsEnum } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';
import { EnumFoulsType, foulsKeys } from '@fouls/constants/fouls.constants';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(
  ['issueDate', 'createdAt', 'foulId.numeral', 'sanctionId.name'],
  'foul_sanction_assignation',
);

export class FoulSanctionAssignationFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly createdStart?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly createdEnd?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly issueDateStart?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly issueDateEnd?: Date;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly peridoId?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly foulId?: number;

  @IsOptional()
  @IsString()
  readonly foulNumeral?: string;

  @IsOptional()
  @IsEnum(EnumFoulsType, { message: `foulsType: Debe ser uno de los siguientes valores: ${foulsKeys}` })
  readonly foulsType?: EnumFoulsType;
}
