import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';

const sortOptions = getSortOptions('name');
export const sortOptionsMap = getSortOptionsMap('role', sortOptions);

export class RoleFilterDto {
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
