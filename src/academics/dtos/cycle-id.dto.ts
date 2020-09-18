import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class CycleIdDto {
  @IsId()
  @Type(() => Number)
  cycleId!: number;
}
