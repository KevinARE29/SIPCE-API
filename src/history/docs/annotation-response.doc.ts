import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Annotation } from './annotation.doc';

export class AnnotationResponse implements IApiResponse<Annotation> {
  @ApiProperty({ type: Annotation })
  data!: Annotation;
}
