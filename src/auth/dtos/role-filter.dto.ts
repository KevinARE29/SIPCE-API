import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';

const sortOptions = ['name-asc', 'name-desc'];

export const sortOptionsMap = new Map()
  .set('name-asc', { 'role.name': 'ASC' })
  .set('name-desc', { 'role.name': 'DESC' });

export class RoleFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  sort?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: validator.isString })
  name?: string;
}
