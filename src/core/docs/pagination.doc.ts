import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  totalPages!: number;

  @ApiProperty()
  perPage!: number;

  @ApiProperty()
  totalItems!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  nextPage!: number | null;

  @ApiProperty()
  previousPage!: number | null;
}
