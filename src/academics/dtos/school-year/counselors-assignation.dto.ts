import { IsId } from '@core/decorators/id.decorator';
import { IsPositive, IsInt } from 'class-validator';

export class CounselorsAssignationDto {
  @IsPositive({ each: true })
  @IsInt({ each: true })
  readonly gradeIds!: number[];

  @IsId()
  readonly counselorId!: number;
}
