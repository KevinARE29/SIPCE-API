import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionBank } from './question-bank.doc';

export class QuestionBankResponse implements IApiResponse<QuestionBank> {
  @ApiProperty({ type: QuestionBank })
  data!: QuestionBank;
}
