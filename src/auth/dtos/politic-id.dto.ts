import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class PoliticIdDto {
  @IsId()
  @Type(() => Number)
  readonly politicId!: number;
}
