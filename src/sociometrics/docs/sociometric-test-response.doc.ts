import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { SociometricTest } from './sociometric-test.doc';

export class SociometricTestResponse implements IApiResponse<SociometricTest> {
  @ApiProperty({ type: SociometricTest })
  data!: SociometricTest;
}
