import { IsOptional, IsEnum } from 'class-validator';
import { IsId } from '@core/decorators/id.decorator';
import { ESchoolYearStatus, TYearStatus, yearStatusKeys } from '@academics/constants/academic.constants';

export class CurrentAssignationDto {
  @IsOptional()
  @IsId()
  readonly shiftId?: number;

  @IsOptional()
  @IsId()
  readonly cycleId?: number;

  @IsOptional()
  @IsId()
  readonly gradeId?: number;

  @IsOptional()
  @IsId()
  readonly sectionId?: number;

  @IsOptional()
  @IsId()
  readonly teacherId?: number;

  @IsOptional()
  @IsId()
  readonly auxTeacherId?: number;

  @IsOptional()
  @IsId()
  readonly counselorId?: number;

  @IsOptional()
  @IsId()
  readonly cycleCoordinatorId?: number;

  @IsOptional()
  @IsEnum(ESchoolYearStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${yearStatusKeys}`,
  })
  readonly status?: TYearStatus;
}
