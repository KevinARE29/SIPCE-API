import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptionsv2 } from '@core/utils/sort.util';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(['annotationDate', 'title', 'reporterId'], 'class_diary');

export class AnnotationsFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly startedAt?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly finishedAt?: Date;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly reporter?: string;
}
