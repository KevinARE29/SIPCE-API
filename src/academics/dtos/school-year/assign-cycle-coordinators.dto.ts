import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { ShiftCycleCoordinatorsDto } from './shift-cycle-coordinators.dto';

export class AssignCycleCoordinatorsDto {
  @IsDtoArray(ShiftCycleCoordinatorsDto)
  readonly shifts!: ShiftCycleCoordinatorsDto[];
}
