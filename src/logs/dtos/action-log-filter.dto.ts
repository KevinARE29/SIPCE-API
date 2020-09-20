import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsPositive, IsInt, IsDateString, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer';
import { actionValues } from '@logs/constants/log.constant';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';

const sortOptions = getSortOptions('username', 'endpoint', 'action', 'statusCode', 'attemptTime');
export const sortOptionsMap = getSortOptionsMap('actionLog', sortOptions)
  .set('username-asc', { 'user.username': 'ASC' })
  .set('username-desc', { 'user.username': 'DESC' });

export class ActionLogFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly username?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly endpoint?: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn(actionValues, { message: validator.isIn })
  readonly action?: number;

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
