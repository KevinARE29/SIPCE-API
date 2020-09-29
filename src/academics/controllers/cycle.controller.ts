import { Controller, UseGuards, Get, Query, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CycleService } from '@academics/services/cycle.service';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { CycleFilterDto } from '@academics/dtos/cycle-filter.dto';
import { CyclesResponse } from '@academics/docs/cycles-response.doc';
import { CycleResponse } from '@academics/docs/cycle-response.doc';
import { CatalogueDto } from '@academics/dtos/catalogue.dto';
import { CycleIdDto } from '@academics/dtos/cycle-id.dto';
import { SchoolYearGuard } from '@academics/guards/school-year.guard';

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

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Crear Ciclos',
    description: 'Use este endpoint para crear un nuevo ciclo',
  })
  @UseGuards(SchoolYearGuard)
  @Post('')
  createCycle(@Body() createCatalogueDto: CatalogueDto): Promise<CycleResponse> {
    return this.cycleService.createCycle(createCatalogueDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Actualizar Ciclo',
    description: 'Use este endpoint para actualizar un ciclo específico',
  })
  @UseGuards(SchoolYearGuard)
  @Put(':cycleId')
  updateCycle(@Param() idDto: CycleIdDto, @Body() updateCycleDto: CatalogueDto): Promise<CycleResponse> {
    return this.cycleService.updateCycle(idDto.cycleId, updateCycleDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Eliminar Ciclos',
    description: 'Use este endpoint para eliminar un ciclo específico',
  })
  @UseGuards(SchoolYearGuard)
  @HttpCode(204)
  @Delete(':cycleId')
  deleteCycle(@Param() idDto: CycleIdDto): Promise<void> {
    return this.cycleService.deleteCycle(idDto.cycleId);
  }
}
