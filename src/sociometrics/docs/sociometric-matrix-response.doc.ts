import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { SociometricMatrix } from './sociometric-matrix-doc';

export class SociometricMatrixResponse implements IApiResponse<SociometricMatrix> {
  @ApiProperty({ type: SociometricMatrix })
  data!: SociometricMatrix;
}
