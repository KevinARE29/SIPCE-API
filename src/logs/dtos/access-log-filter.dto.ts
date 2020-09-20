import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsPositive, IsInt, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';

const sortOptions = getSortOptions('username', 'ip', 'statusCode', 'attemptTime');
export const sortOptionsMap = getSortOptionsMap('accessLog', sortOptions);

export class AccessLogFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly username?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly ip?: string;

  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  @Type(() => Number)
  readonly statusCode?: number;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly attemptTimeStart?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly attemptTimeEnd?: Date;
}
