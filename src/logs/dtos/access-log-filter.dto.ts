import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsPositive, IsInt, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer';

const sortOptions = [
  'username-asc',
  'username-desc',
  'ip-asc',
  'ip-desc',
  'statusCode-asc',
  'statusCode-desc',
  'attemptTime-asc',
  'attemptTime-desc',
];

export const sortOptionsMap = new Map()
  .set('username-asc', { 'accessLog.username': 'ASC' })
  .set('username-desc', { 'accessLog.username': 'DESC' })
  .set('ip-asc', { 'accessLog.ip': 'ASC' })
  .set('ip-desc', { 'accessLog.ip': 'DESC' })
  .set('statusCode-asc', { 'accessLog.statusCode': 'ASC' })
  .set('statusCode-desc', { 'accessLog.statusCode': 'DESC' })
  .set('attemptTime-asc', { 'accessLog.attemptTime': 'ASC' })
  .set('attemptTime-desc', { 'accessLog.attemptTime': 'DESC' });

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
