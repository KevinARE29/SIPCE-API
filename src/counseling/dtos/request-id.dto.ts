import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class RequestIdDto {
  @IsId()
  @Type(() => Number)
  readonly requestId!: number;
}
