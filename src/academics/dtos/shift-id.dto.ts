import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class ShiftIdDto {
  @IsId()
  @Type(() => Number)
  readonly shiftId!: number;
}
