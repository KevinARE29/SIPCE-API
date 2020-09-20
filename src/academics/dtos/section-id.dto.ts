import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class SectionIdDto {
  @IsId()
  @Type(() => Number)
  readonly sectionId!: number;
}
