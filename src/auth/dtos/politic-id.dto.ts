import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class PoliticIdDto {
  @IsId()
  @Type(() => Number)
  politicId!: number;
}
