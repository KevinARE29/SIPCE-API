import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsIn, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(
  ['periodId', 'sanctionId', 'foulId', 'behavioralHistoryId'],
  'issueDate',
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
  readonly peridoId?: number;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  readonly paginate?: string;
}
