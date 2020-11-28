import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BehavioralHistory } from './behavioral-history.doc';

export class BehavioralHistoryResponse implements IApiResponse<BehavioralHistory> {
  @ApiProperty({ type: BehavioralHistory })
  data!: BehavioralHistory;
}
