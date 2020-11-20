import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class InterventionProgramIdsDto {
  @Type(() => Number)
  @IsId()
  readonly interventionProgramId!: number;
}
