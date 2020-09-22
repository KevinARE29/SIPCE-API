import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class PeriodIdDto {
  @IsId()
  @Type(() => Number)
  readonly periodId!: number;
}
