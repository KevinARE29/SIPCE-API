import { IApiResponse } from '../../core/interfaces/api-response.interface';
import { Politic } from './politic.doc';

export class PoliticResponse implements IApiResponse<Politic> {
  data!: Politic;
}
