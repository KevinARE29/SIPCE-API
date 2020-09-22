import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class UserIdDto {
  @IsId()
  @Type(() => Number)
  readonly userId!: number;
}
