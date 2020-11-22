import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsEnum, IsString, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { getSortOptionsv2 } from '@core/utils/sort.util';
import {
  EnumInterventionProgramType,
  interventionProgramTypeKeys,
} from '@expedient/constants/intervention-program.constants';

export const [sortOptions, sortOptionsMap] = getSortOptionsv2(['name', 'type'], 'intervention_program');

export class InterventionProgramFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly name?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsIn(['true', 'false'], { message: validator.isIn })
  readonly status?: string;

  @IsOptional()
  @IsEnum(EnumInterventionProgramType, {
    message: `type: Debe ser uno de los siguientes valores: ${interventionProgramTypeKeys}`,
  })
  readonly type?: string;
}
