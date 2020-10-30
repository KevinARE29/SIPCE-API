import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class SanctionsIdDto {
  @Type(() => Number)
  @IsId()
  readonly sanctionsId!: number;
}
