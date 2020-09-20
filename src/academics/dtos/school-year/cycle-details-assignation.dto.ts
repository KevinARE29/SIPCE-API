import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { GradeAssignationDto } from './grade-details-assignation.dto';

export class CycleAssignationDto {
  @IsId()
  readonly cycleId!: number;

  @IsDtoArray(GradeAssignationDto)
  readonly grades!: GradeAssignationDto[];
}
