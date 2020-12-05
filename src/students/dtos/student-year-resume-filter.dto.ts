import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(['firstname', 'lastname'], 'student');

export class StudentYearResumeFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly currentGrade?: number;
}
