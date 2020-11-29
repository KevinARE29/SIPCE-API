import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '@core/docs/pagination.doc';
import { CompleteAnnotation } from './complete-annotation.doc';

export class CompleteAnnotationResponse implements IApiResponse<CompleteAnnotation[]> {
  @ApiProperty({ type: [CompleteAnnotation] })
  data!: CompleteAnnotation[];

  pagination!: Pagination;
}
