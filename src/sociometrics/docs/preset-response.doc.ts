import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Preset } from './preset.doc';

export class PresetResponse implements IApiResponse<Preset> {
  @ApiProperty({ type: Preset })
  data!: Preset;
}
