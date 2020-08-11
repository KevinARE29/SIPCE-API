import { IsOptional, IsEnum } from 'class-validator';
import { IsId } from '@core/decorators/id.decorator';
import { ESchoolYearStatus, yearStatusValues, TYearStatus } from '@academics/constants/academic.constants';

export class CurrentAssignationDto {
  @IsOptional()
  @IsId()
  shiftId?: number;

  @IsOptional()
  @IsId()
  cycleId?: number;

  @IsOptional()
  @IsId()
  gradeId?: number;

  @IsOptional()
  @IsId()
  sectionId?: number;

  @IsOptional()
  @IsEnum(ESchoolYearStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${yearStatusValues}`,
  })
  status?: TYearStatus;
}
