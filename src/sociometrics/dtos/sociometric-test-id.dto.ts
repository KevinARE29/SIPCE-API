import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class SociometricTestIdDto {
  @IsId()
  @Type(() => Number)
  readonly sociometricTestId!: number;
}
