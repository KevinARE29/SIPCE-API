import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { CycleCoordinatorsAssignationDto } from './cycle-coordinators-assignation.dto';

export class ShiftCycleCoordinatorsDto {
  @IsId()
  shiftId!: number;

  @IsDtoArray(CycleCoordinatorsAssignationDto)
  cycles!: CycleCoordinatorsAssignationDto[];
}
