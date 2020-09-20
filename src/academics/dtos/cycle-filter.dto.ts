import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';

const sortOptions = getSortOptions('name');
export const sortOptionsMap = getSortOptionsMap('cycle', sortOptions);

export class CycleFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly name?: string;
}
