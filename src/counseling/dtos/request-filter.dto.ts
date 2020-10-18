import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { IsId } from '@core/decorators/id.decorator';

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
  readonly currentShiftId?: number;

  @IsOptional()
  @IsId()
  readonly currentGradeId?: number;

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
