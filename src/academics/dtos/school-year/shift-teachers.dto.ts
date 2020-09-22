import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { GradeTeachersDto } from './grade-teachers.dto';

export class ShiftTeachersDto {
  @IsId()
  readonly shiftId!: number;

  @IsDtoArray(GradeTeachersDto)
  readonly grades!: GradeTeachersDto[];
}
