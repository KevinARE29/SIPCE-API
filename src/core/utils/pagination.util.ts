import { Pagination } from '../docs/pagination.doc';
import { PageDto } from '../dtos/page.dto';

export function getPagination(pageDto: PageDto, totalItems: number): Pagination {
  const { page, perPage } = pageDto;
  const totalPages = Math.ceil(totalItems / perPage);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 && !(page > totalPages) ? page - 1 : null;
  return {
    totalPages,
    perPage,
    totalItems,
    page,
    nextPage,
    previousPage,
  };
}
