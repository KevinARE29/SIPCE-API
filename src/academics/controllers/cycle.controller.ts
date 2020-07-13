import { Controller, UseGuards, Get, Query, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CycleService } from '@academics/services/cycle.service';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { CycleFilterDto } from '@academics/dtos/cycle-filter.dto';
import { CyclesResponse } from '@academics/docs/cycles-response.doc';
/*
import { SectionResponse } from '@academics/docs/section-response.doc';
import { CatalogueDto } from '@academics/dtos/catalogue.dto';
import { SectionIdDto } from '@academics/dtos/section-id.dto';
*/

@ApiTags('Cycle Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/cycles')
export class CycleController {
  constructor(private readonly cycleService: CycleService) {}

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Listar Ciclos',
    description: 'Use este endpoint para listar los ciclos  existentes',
  })
  @Get('')
  getAllCycles(@Query() pageDto: PageDto, @Query() cycleFilterDto: CycleFilterDto): Promise<CyclesResponse> {
    return this.cycleService.getAllCycles(pageDto, cycleFilterDto);
  }

  /*
  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Crear Sección',
    description: 'Use este endpoint para crear una nueva sección',
  })
  @Post('')
  createRole(@Body() createCatalogueDto: CatalogueDto): Promise<SectionResponse> {
    return this.sectionService.createSection(createCatalogueDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Actualizar Sección',
    description: 'Use este endpoint para actualizar una sección específica',
  })
  @Put(':sectionId')
  updateRole(@Param() idDto: SectionIdDto, @Body() updateRoleDto: CatalogueDto): Promise<SectionResponse> {
    return this.sectionService.updateSection(idDto.sectionId, updateRoleDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Eliminar Sección',
    description: 'Use este endpoint para eliminar una sección específica',
  })
  @HttpCode(204)
  @Delete(':sectionId')
  deleteRole(@Param() idDto: SectionIdDto): Promise<void> {
    return this.sectionService.deleteSection(idDto.sectionId);
  }

  */
}
