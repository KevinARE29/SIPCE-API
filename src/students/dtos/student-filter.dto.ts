import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Validate, IsString, IsPositive, IsInt, IsEnum } from 'class-validator';
import { SortOptionsValidator } from '@core/validators/sort-options.validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer';
import { getSortOptions, getSortOptionsMap } from '@core/utils/sort.util';
import { EStudentStatus, statusKeys, TStatus } from '@students/constants/student.constant';

const sortOptions = getSortOptions('code', 'firstname', 'lastname', 'email', 'status', 'currentGrade');
export const sortOptionsMap = getSortOptionsMap('student', sortOptions);

export class StudentFilterDto {
  @ApiPropertyOptional({ enum: sortOptions })
  @IsOptional()
  @Validate(SortOptionsValidator, sortOptions)
  sort?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  code?: string;

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
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  @Type(() => Number)
  currentGrade?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsEnum(EStudentStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${statusKeys}`,
  })
  status?: TStatus;
}
