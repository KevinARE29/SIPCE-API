import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Pagination } from '@core/docs/pagination.doc';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionBank } from './question-bank.doc';

export class QuestionBanksResponse implements IApiResponse<QuestionBank[]> {
  @ApiProperty({ type: [QuestionBank] })
  data!: QuestionBank[];

  pagination?: Pagination;
}
