import { IsPositive, IsInt } from 'class-validator';
import { IsId } from '@core/decorators/id.decorator';

export class GradeAssignationDto {
  @IsId()
  gradeId!: number;

  @IsInt({ each: true })
  @IsPositive({ each: true })
  sections!: number[];
}
