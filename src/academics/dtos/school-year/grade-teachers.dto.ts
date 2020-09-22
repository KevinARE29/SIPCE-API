import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { SectionTeachersDto } from './section-teachers.dto';

export class GradeTeachersDto {
  @IsId()
  readonly gradeId!: number;

  @IsDtoArray(SectionTeachersDto)
  readonly sections!: SectionTeachersDto[];
}
