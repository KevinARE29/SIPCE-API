import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class StudentIdDto {
  @Type(() => Number)
  @IsId()
  studentId!: number;
}
