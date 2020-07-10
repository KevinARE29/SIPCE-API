import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SectionService } from '@academics/services/section.service';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SectionFilterDto } from '@academics/dtos/section-filter.dto';
import { SectionsResponse } from '@academics/docs/sections-response.doc';

@ApiTags('Sections Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Listar Secciones',
    description: 'Use este endpoint para listar las secciones de grados existentes',
  })
  @Get('')
  getAllSections(@Query() pageDto: PageDto, @Query() sectionFilterDto: SectionFilterDto): Promise<SectionsResponse> {
    return this.sectionService.getAllSections(pageDto, sectionFilterDto);
  }
}
