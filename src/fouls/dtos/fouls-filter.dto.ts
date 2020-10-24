import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsEnum, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';
import { EnumFoulsType, foulsKeys, TFouls } from '@fouls/constants/fouls.costants';
import { validator } from '@core/messages/validator.message';

const sortOptions = getSortOptions('foul_type');
export const sortOptionsMap = getSortOptionsMap('fouls', sortOptions);

export class FoulsFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEnum(EnumFoulsType, {
    message: `fouls_type: Debe ser uno de los siguientes valores: ${foulsKeys}`,
  })
  readonly foulsType?: TFouls;

  @IsOptional()
  @IsIn(['false'], { message: validator.isIn })
  readonly paginate?: string;

}
