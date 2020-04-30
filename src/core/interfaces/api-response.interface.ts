import { Pagination } from '../docs/pagination.doc';

export interface IApiResponse<T> {
  data: T;
  pagination?: Pagination;
}
