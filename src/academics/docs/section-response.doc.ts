import { IApiResponse } from '@core/interfaces/api-response.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Section } from '@academics/docs/section.doc';

export class SectionResponse implements IApiResponse<Section> {
  @ApiProperty({ type: Section })
  data!: Section;
}
