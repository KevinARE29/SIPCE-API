import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class FoulsIdDto {
  @Type(() => Number)
  @IsId()
  readonly foulsId!: number;
}
