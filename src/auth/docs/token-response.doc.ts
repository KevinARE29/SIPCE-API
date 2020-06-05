import { IApiResponse } from '@core/interfaces/api-response.interface';
import { Token } from './token.doc';

export class TokenResponse implements IApiResponse<Token> {
  data!: Token;
}
