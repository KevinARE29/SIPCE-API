import { Controller, UseGuards, Body, Post, Param, Put, HttpCode, Delete, Get, Query } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { PageDto } from '@core/dtos/page.dto';
import { SanctionsService } from '@sanctions/services/sanctions.service';
import { SanctionsFilterDto } from '@sanctions/dtos/sanctions-filter.dto';
import { SanctionsResponse } from '@sanctions/docs/sanctions-response.doc';
import { CreateSanctionsDto } from '@sanctions/dtos/create-sanction.dto';
import { SanctionResponse } from '@sanctions/docs/sanction-response.doc';
import { UpdateSanctionsDto } from '@sanctions/dtos/update-sanctions.dto';
import { SanctionsIdDto } from '@sanctions/dtos/sanctions-id.dto';
@ApiTags('Sanctions Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sanctions')
export class SanctionsController {
  constructor(private readonly sanctionsService: SanctionsService) {}

  @Auth('view_sanctions')
  @ApiOperation({
    summary: 'Buscar Sanciones',
    description: 'Use este endpoint para buscar sanciones.',
  })
  @Get('')
  async getAllSanctions(
    @Query() pageDto: PageDto,
    @Query() sanctionsFilterDto: SanctionsFilterDto,
  ): Promise<SanctionsResponse> {
    return this.sanctionsService.getAllSanctions(pageDto, sanctionsFilterDto);
  }

  @Auth('view_sanctions')
  @ApiOperation({
    summary: 'Ver detalle de una Sanción',
    description: 'Use este endpoint para ver el detalle de una sanción específica.',
  })
  @Get(':sanctionsId')
  getSingleFoul(@Param() idDto: SanctionsIdDto): Promise<SanctionResponse> {
    return this.sanctionsService.getSingleSanction(idDto.sanctionsId);
  }

  @Auth('manage_sanctions')
  @ApiOperation({
    summary: 'Crear sanciones aplicables a los estudiantes',
    description: 'Use este endpoint para crear una sanción en el sistema informático.',
  })
  @Post('')
  async createFouls(@Body() createSanctionsDto: CreateSanctionsDto): Promise<SanctionResponse> {
    return this.sanctionsService.createSanctions(createSanctionsDto);
  }

  @Auth('manage_sanctions')
  @ApiOperation({
    summary: 'Actualizar una sanción específica',
    description: 'Use este endpoint para actualizar los datos de una sanción específica.',
  })
  @Put(':sanctionsId')
  async updateEvent(
    @Param() sanctionsIdDto: SanctionsIdDto,
    @Body() updateSanctionsDto: UpdateSanctionsDto,
  ): Promise<SanctionResponse> {
    return this.sanctionsService.updateSanctions(sanctionsIdDto.sanctionsId, updateSanctionsDto);
  }

  @Auth('manage_sanctions')
  @ApiOperation({
    summary: 'Eliminar sanciones',
    description: 'Use este endpoint para eliminar una sanción específica.',
  })
  @HttpCode(204)
  @Delete(':sanctionsId')
  async deleteFouls(@Param() idDto: SanctionsIdDto): Promise<void> {
    return this.sanctionsService.deleteSanctions(idDto.sanctionsId);
  }
}
