import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsBooleanString, IsIn, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';
import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

const sortOptions = getSortOptions('username', 'firstname', 'lastname', 'email', 'createdAt');
export const sortOptionsMap = getSortOptionsMap('user', sortOptions);

export class UserFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly username?: string;

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
  @Type(() => Number)
  @IsId()
  readonly role?: number;

  @IsOptional()
  @IsBooleanString({ message: validator.isBoolean })
  readonly active?: boolean;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  readonly credentials?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly createdAtStart?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly createdAtEnd?: Date;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  readonly paginate?: string;
}
