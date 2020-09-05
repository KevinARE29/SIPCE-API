import { IsId } from '@core/decorators/id.decorator';

export class SectionTeachersDto {
  @IsId()
  readonly sectionId!: number;

  @IsId()
  readonly teacherId!: number;
}
