import { IsId } from '@core/decorators/id.decorator';
import { Type } from 'class-transformer';

export class StudentAssignationFilterDto {
  @IsId()
  @Type(() => Number)
  readonly currentGradeId!: number;

  @IsId()
  @Type(() => Number)
  readonly currentShiftId!: number;
}
