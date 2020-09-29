import { Controller, UseGuards, Get, Query, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
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
import { SchoolYearGuard } from '@academics/guards/school-year.guard';

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
  @UseGuards(SchoolYearGuard)
  @Post('')
  createSection(@Body() createCatalogueDto: CatalogueDto): Promise<SectionResponse> {
    return this.sectionService.createSection(createCatalogueDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Actualizar Sección',
    description: 'Use este endpoint para actualizar una sección específica',
  })
  @UseGuards(SchoolYearGuard)
  @Put(':sectionId')
  updateSection(@Param() idDto: SectionIdDto, @Body() updateSectionDto: CatalogueDto): Promise<SectionResponse> {
    return this.sectionService.updateSection(idDto.sectionId, updateSectionDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Eliminar Sección',
    description: 'Use este endpoint para eliminar una sección específica',
  })
  @UseGuards(SchoolYearGuard)
  @HttpCode(204)
  @Delete(':sectionId')
  deleteSection(@Param() idDto: SectionIdDto): Promise<void> {
    return this.sectionService.deleteSection(idDto.sectionId);
  }
}
