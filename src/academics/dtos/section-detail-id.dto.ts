import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class SectionDetailIdDto {
  @IsId()
  @Type(() => Number)
  readonly sectionDetailId!: number;
}
