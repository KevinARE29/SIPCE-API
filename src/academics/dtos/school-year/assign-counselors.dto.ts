import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { ShiftCounselorsDto } from './shift-counselors.dto';

export class AssignCounselorsDto {
  @IsDtoArray(ShiftCounselorsDto)
  readonly shifts!: ShiftCounselorsDto[];
}
