import { Controller, UseGuards, Body, Post, Param, Put, HttpCode, Delete, Get, Query } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { FoulsService } from '@fouls/services/fouls.service';
import { CreateFoulsDto } from '@fouls/dtos/create-foul.dto';
import { FoulResponse } from '@fouls/docs/foul-response.doc';
import { UpdateFoulsDto } from '@fouls/dtos/update-fouls.dto';
import { FoulsIdDto } from '@fouls/dtos/fouls-id.dto';
import { FoulsResponse } from '@fouls/docs/fouls-response.doc';
import { PageDto } from '@core/dtos/page.dto';
import { FoulsFilterDto } from '@fouls/dtos/fouls-filter.dto';
@ApiTags('Fouls Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('fouls')
export class FoulsController {
  constructor(private readonly foulsService: FoulsService) {}

  // @Auth('view_fouls')
  @ApiOperation({
    summary: 'Buscar Faltas',
    description: 'Use este endpoint para buscar faltas.',
  })
  @Get('')
  async getAllFouls(@Query() pageDto: PageDto, @Query() foulsFilterDto: FoulsFilterDto): Promise<FoulsResponse> {
    return this.foulsService.getAllFouls(pageDto, foulsFilterDto);
  }

  @Auth('view_fouls')
  @ApiOperation({
    summary: 'Ver detalle de una Falta',
    description: 'Use este endpoint para ver el detalle de una falta específica.',
  })
  @Get(':foulsId')
  getSingleFoul(@Param() idDto: FoulsIdDto): Promise<FoulResponse> {
    return this.foulsService.getSingleFoul(idDto.foulsId);
  }

  @Auth('manage_fouls')
  @ApiOperation({
    summary: 'Crear faltas aplicables a los estudiantes',
    description: 'Use este endpoint para crear nuevas faltas en el sistema informático.',
  })
  @Post('')
  async createFouls(@Body() createFoulsDto: CreateFoulsDto): Promise<FoulResponse> {
    return this.foulsService.createFouls(createFoulsDto);
  }

  @Auth('manage_fouls')
  @ApiOperation({
    summary: 'Actualizar una falta específica',
    description: 'Use este endpoint para actualizar los datos de una falta específica.',
  })
  @Put(':foulsId')
  async updateEvent(@Param() foulsIdDto: FoulsIdDto, @Body() updateFoulsDto: UpdateFoulsDto): Promise<FoulResponse> {
    return this.foulsService.updateFouls(foulsIdDto.foulsId, updateFoulsDto);
  }

  @Auth('manage_fouls')
  @ApiOperation({
    summary: 'Eliminar Faltas',
    description: 'Use este endpoint para eliminar una falta específica.',
  })
  @HttpCode(204)
  @Delete(':foulsId')
  async deleteFouls(@Param() idDto: FoulsIdDto): Promise<void> {
    return this.foulsService.deleteFouls(idDto.foulsId);
  }
}
