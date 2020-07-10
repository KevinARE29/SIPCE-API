import { Controller, UseGuards, Get, Query, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SectionService } from '@academics/services/section.service';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SectionFilterDto } from '@academics/dtos/section-filter.dto';
import { SectionsResponse } from '@academics/docs/sections-response.doc';
import { SectionResponse } from '@academics/docs/section-response.doc';
import { CatalogueDto } from '@academics/dtos/catalogue.dto';
import { SectionIdDto } from '@academics/dtos/section-id.dto';

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

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Crear Sección',
    description: 'Use este endpoint para crear una nueva sección',
  })
  @Post('')
  createRole(@Body() createCatalogueDto: CatalogueDto): Promise<SectionResponse> {
    return this.sectionService.createSection(createCatalogueDto);
  }

  @Put(':sectionId')
  updateRole(@Param() idDto: SectionIdDto, @Body() updateRoleDto: CatalogueDto): Promise<SectionResponse> {
    return this.sectionService.updateSection(idDto.sectionId, updateRoleDto);
  }
}
