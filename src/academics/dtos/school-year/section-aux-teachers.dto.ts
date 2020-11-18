import { IsId } from '@core/decorators/id.decorator';

export class SectionAuxTeachersDto {
  @IsId()
  readonly sectionId!: number;

  @IsId({ each: true })
  readonly auxTeacherIds!: number[];
}
