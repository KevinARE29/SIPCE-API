import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { ShiftTeachersDto } from './shift-teachers.dto';

export class AssignTeachersDto {
  @IsDtoArray(ShiftTeachersDto)
  readonly shifts!: ShiftTeachersDto[];
}
