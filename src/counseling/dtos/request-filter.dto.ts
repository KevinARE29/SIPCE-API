import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(
  [
    'createdAt',
    'student.code',
    'student.firstname',
    'student.lastname',
    'student.email',
    'student.currentShiftId',
    'student.currentGradeId',
  ],
  'request',
);

export class RequestFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly currentShift?: number;

  @IsOptional()
  @IsId()
  @Type(() => Number)
  readonly currentGrade?: number;

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
  @IsString({ message: validator.isString })
  readonly email?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly createdAtStart?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly createdAtEnd?: Date;
}
