import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsDateString, IsEnum } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import { EnumSessionType, sessionTypeKeys } from '@expedient/constants/session.constants';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(['startedAt', 'sessionType', 'identifier'], 'session');

export class SessionsFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly startedAt?: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly finishedAt?: Date;

  @IsOptional()
  @IsEnum(EnumSessionType, {
    message: `sessionType: Debe ser uno de los siguientes valores: ${sessionTypeKeys}`,
  })
  readonly sessionType?: string;
}
