import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { CycleAssignationDto } from './cycle-details-assignation.dto';

export class ShiftAssignationDto {
  @IsId()
  shiftId!: number;

  @IsDtoArray(CycleAssignationDto)
  cycles!: CycleAssignationDto[];
}
