import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';
import { SociometricTestIdDto } from './sociometric-test-id.dto';

export class SociometricTestPresetIdDto extends SociometricTestIdDto {
  @IsId()
  @Type(() => Number)
  readonly presetId!: number;
}
