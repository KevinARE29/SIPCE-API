import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsEnum, IsIn, IsString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { EnumFoulsType, foulsKeys, TFouls } from '@fouls/constants/fouls.constants';
import { validator } from '@core/messages/validator.message';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(['foulsType', 'numeral'], 'fouls');
export class FoulsFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEnum(EnumFoulsType, { message: `fouls_type: Debe ser uno de los siguientes valores: ${foulsKeys}` })
  readonly foulsType?: TFouls;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly numeral?: string;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  readonly paginate?: string;
}
