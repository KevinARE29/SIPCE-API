import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsIn, IsString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';
import { validator } from '@core/messages/validator.message';

const sortOptions = getSortOptions('name');
export const sortOptionsMap = getSortOptionsMap('sanction', sortOptions);

export class SanctionsFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly numeral?: string;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  readonly paginate?: string;
}
