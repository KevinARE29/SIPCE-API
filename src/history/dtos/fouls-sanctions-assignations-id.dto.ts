import { IsId } from '@core/decorators/id.decorator';
import { IsArray } from 'class-validator';

export class FoulSanctionAssignationsIdDto {
  @IsArray()
  @IsId({ each: true })
  readonly assignationId!: number[];
}
