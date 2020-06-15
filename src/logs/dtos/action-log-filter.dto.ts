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
  sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: validator.isString })
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: validator.isString })
  endpoint?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsIn(actionValues, { message: validator.isIn })
  action?: number;

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
