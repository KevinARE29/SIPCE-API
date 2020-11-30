import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { SociometricTestDetail } from './sociometric-test-detail.doc';

export class SociometricTestDetailResponse implements IApiResponse<SociometricTestDetail> {
  @ApiProperty({ type: SociometricTestDetail })
  data!: SociometricTestDetail;
}
