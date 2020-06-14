import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsPositive, IsInt, IsDateString, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer';
import { actionValues } from '@logs/constants/log.constant';

const sortOptions = [
  'username-asc',
  'username-desc',
  'endpoint-asc',
  'endpoint-desc',
  'action-asc',
  'action-desc',
  'statusCode-asc',
  'statusCode-desc',
  'attemptTime-asc',
  'attemptTime-desc',
];

export const sortOptionsMap = new Map()
  .set('username-asc', { 'user.username': 'ASC' })
  .set('username-desc', { 'user.username': 'DESC' })
  .set('endpoint-asc', { 'actionLog.endpoint': 'ASC' })
  .set('endpoint-desc', { 'actionLog.endpoint': 'DESC' })
  .set('action-asc', { 'actionLog.action': 'ASC' })
  .set('action-desc', { 'actionLog.action': 'DESC' })
  .set('statusCode-asc', { 'actionLog.statusCode': 'ASC' })
  .set('statusCode-desc', { 'actionLog.statusCode': 'DESC' })
  .set('attemptTime-asc', { 'actionLog.attemptTime': 'ASC' })
  .set('attemptTime-desc', { 'actionLog.attemptTime': 'DESC' });

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
