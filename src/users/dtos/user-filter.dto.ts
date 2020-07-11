import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsBooleanString, IsIn, IsDateString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';
import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

const sortOptions = getSortOptions('username', 'firstname', 'lastname', 'email');
export const sortOptionsMap = getSortOptionsMap('user', sortOptions);

export class UserFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  username?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  firstname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  lastname?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  email?: string;

  @IsOptional()
  @Type(() => Number)
  @IsId()
  role?: number;

  @IsOptional()
  @IsBooleanString({ message: validator.isBoolean })
  active = 'false';

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  credentials?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  createdAtStart?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  createdAtEnd?: Date;
}
