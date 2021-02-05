import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptionsv2 } from '@core/utils/sort.util';

export const [sortOptions, questionBankSortOptionsMap] = getSortOptionsv2(['name'], 'questionBank');

export class QuestionBankFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly name?: string;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  readonly paginate?: string;
}
