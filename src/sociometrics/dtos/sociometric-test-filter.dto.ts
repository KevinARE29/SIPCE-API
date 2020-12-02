import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsEnum, IsBooleanString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';
import {
  ESociometricTestStatus,
  sociometricTestStatusKeys,
  TSociometricTestStatus,
} from '@sociometrics/constants/sociometric.constant';

export const [sortOptions, sociometricTestSortOptionsMap] = getSortOptionsv2(
  ['status', 'sectionDetail.section', 'gradeDetail.grade', 'cycleDetail.shift'],
  'sociometricTest',
);

export class SociometricTestFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly shift?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly grade?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly section?: number;

  @IsOptional()
  @IsBooleanString()
  readonly historical?: string;

  @ApiPropertyOptional({ enum: ESociometricTestStatus })
  @IsOptional()
  @IsEnum(ESociometricTestStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${sociometricTestStatusKeys}`,
  })
  readonly status?: TSociometricTestStatus;
}
