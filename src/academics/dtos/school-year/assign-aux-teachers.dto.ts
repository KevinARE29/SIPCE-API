import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { ShiftAuxTeachersDto } from './shift-aux-teachers.dto';

export class AssignAuxTeachersDto {
  @IsDtoArray(ShiftAuxTeachersDto)
  readonly shifts!: ShiftAuxTeachersDto[];
}
