import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { GradeAuxTeachersDto } from './grade-aux-teachers.dto';

export class ShiftAuxTeachersDto {
  @IsId()
  readonly shiftId!: number;

  @IsDtoArray(GradeAuxTeachersDto)
  readonly grades!: GradeAuxTeachersDto[];
}
