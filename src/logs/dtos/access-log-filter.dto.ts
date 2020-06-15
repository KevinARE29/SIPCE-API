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
  sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: validator.isString })
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: validator.isString })
  ip?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  @Type(() => Number)
  statusCode?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  attemptTimeStart?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  attemptTimeEnd?: Date;
}
