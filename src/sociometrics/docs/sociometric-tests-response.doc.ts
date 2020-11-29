import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { SociometricTest } from './sociometric-test.doc';

export class SociometricTestsResponse implements IApiResponse<SociometricTest[]> {
  @ApiProperty({ type: [SociometricTest] })
  data!: SociometricTest[];

  pagination?: Pagination;
}
