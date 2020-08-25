import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';

export class StudentAssignationFilterDto {
  @IsId()
  @Type(() => Number)
  currentGradeId!: number;

  @IsId()
  @Type(() => Number)
  currentShiftId!: number;
}
