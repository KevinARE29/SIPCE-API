import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { SectionAuxTeachersDto } from './section-aux-teachers.dto';

export class GradeAuxTeachersDto {
  @IsId()
  readonly gradeId!: number;

  @IsDtoArray(SectionAuxTeachersDto)
  readonly sections!: SectionAuxTeachersDto[];
}
