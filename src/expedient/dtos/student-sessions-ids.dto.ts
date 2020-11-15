import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class StudentExpedientIdsDto {
  @Type(() => Number)
  @IsId()
  readonly studentId!: number;

  @Type(() => Number)
  @IsId()
  readonly expedientId!: number;
}
