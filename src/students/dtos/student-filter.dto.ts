import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsEnum, IsIn } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';
import { EStudentStatus, statusKeys, TStatus } from '@students/constants/student.constant';
import { IsId } from '@core/decorators/id.decorator';

const sortOptions = getSortOptions('code', 'firstname', 'lastname', 'email', 'status', 'currentGrade');
export const sortOptionsMap = getSortOptionsMap('student', sortOptions);

export class StudentFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  readonly sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly code?: string;

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
  @IsId()
  @Type(() => Number)
  readonly currentGrade?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEnum(EStudentStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${statusKeys}`,
  })
  readonly status?: TStatus;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsIn(['true', 'false'], { message: validator.isIn })
  readonly active?: string;
}
