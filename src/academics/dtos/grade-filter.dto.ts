import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsBooleanString, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';

const sortOptions = getSortOptions('name');
export const sortOptionsMap = getSortOptionsMap('grade', sortOptions);

export class GradeFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: validator.isString })
  name?: string;

  @IsOptional()
  @IsBooleanString({ message: validator.isBoolean })
  active?: boolean;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  paginate?: string;
}
