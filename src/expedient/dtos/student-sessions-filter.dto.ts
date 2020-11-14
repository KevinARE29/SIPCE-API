import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(
  ['code', 'firstname', 'lastname', 'currentShift', 'currentGrade'],
  'student',
);

export class StudentSessionsFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly code?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly firstname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly lastname?: string;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly currentShift?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly currentGrade?: number;
}
