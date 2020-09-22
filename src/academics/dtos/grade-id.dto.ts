import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class GradeIdDto {
  @IsId()
  @Type(() => Number)
  readonly gradeId!: number;
}
