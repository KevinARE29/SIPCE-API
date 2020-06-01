import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  totalPages!: number;

  perPage!: number;

  totalItems!: number;

  page!: number;

  nextPage?: number;

  previousPage?: number;
}
