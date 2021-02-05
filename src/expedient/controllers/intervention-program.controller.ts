import { Controller, Get, Query, UseGuards, Body, Post, Delete, HttpCode, Param, Patch } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { InterventionProgramService } from '@expedient/services/intervention-program.service';
import { InterventionProgramFilterDto } from '@expedient/dtos/intervention-program-filter.dto';
import { InterventionProgramsResponse } from '@expedient/docs/intervention-programs-response.doc';
import { CreateInterventionProgramDto } from '@expedient/dtos/create-intervention-program.dto';
import { InterventionProgramResponse } from '@expedient/docs/intervention-program-response.doc';
import { InterventionProgramIdsDto } from '@expedient/dtos/intervention-program-ids.dto';
import { UpdateInterventionProgramDto } from '@expedient/dtos/update-intervention-program.dto';
import { AvailableInterventionProgramResponse } from '@expedient/docs/available-intervention-programs-response.doc';

@ApiTags('Intervention Programs Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('intervention-programs')
export class InterventionProgramController {
  constructor(private readonly interventonProgramService: InterventionProgramService) {}

  @ApiOperation({
    summary: 'Consulta de los programas de intervención creados por un orientador',
    description: 'Use este endpoint para consultar los programas de intervención creados por un orientador',
  })
  @Auth('manage_expedient')
  @Get()
  getCounselorInterventionPrograms(
    @Query() interventionProgramFilterDto: InterventionProgramFilterDto,
    @Query() pageDto: PageDto,
    @User() { id }: IAuthenticatedUser,
  ): Promise<InterventionProgramsResponse> {
    return this.interventonProgramService.findCounselorInterventionPrograms(id, interventionProgramFilterDto, pageDto);
  }

  @ApiOperation({
    summary: 'Crear un programa de intervención',
    description: 'Use este endpoint para crear un programa de intervención',
  })
  @Auth('manage_expedient')
  @Post()
  createCounselorInterventionProgram(
    @User() { id }: IAuthenticatedUser,
    @Body() createInterventionProgramDto: CreateInterventionProgramDto,
  ): Promise<InterventionProgramResponse> {
    return this.interventonProgramService.createCounselorInterventionProgram(id, createInterventionProgramDto);
  }

  @ApiOperation({
    summary: 'Eliminar un programa de intervención',
    description: 'Use este endpoint para eliminar un programa de intervención',
  })
  @Auth('manage_expedient')
  @Delete(':interventionProgramId')
  @HttpCode(204)
  DeleteCounselorInterventionProgram(
    @Param() interventionProgramIdsDto: InterventionProgramIdsDto,
    @User() { id }: IAuthenticatedUser,
  ): Promise<void> {
    return this.interventonProgramService.deleteCounselorInterventionProgram(interventionProgramIdsDto, id);
  }

  @ApiOperation({
    summary: 'Editar un programa de intervención',
    description: 'Use este endpoint para editar un programa de intervención',
  })
  @Auth('manage_expedient')
  @Patch(':interventionProgramId')
  UpdateCounselorInterventionProgram(
    @Param() interventionProgramIdsDto: InterventionProgramIdsDto,
    @User() { id }: IAuthenticatedUser,
    @Body() updateInterventionProgramDto: UpdateInterventionProgramDto,
  ): Promise<InterventionProgramResponse> {
    return this.interventonProgramService.updateCounselorInterventionProgram(
      interventionProgramIdsDto,
      id,
      updateInterventionProgramDto,
    );
  }

  @ApiOperation({
    summary: 'Obtener los programas de intervención disponibles para una sesión individual',
    description: 'Use este endpoint para obtener los programas de intervención disponibles para una sesión individual',
  })
  @Auth('manage_expedient')
  @Get('availables')
  getAvailableInterventionPrograms(@User() { id }: IAuthenticatedUser): Promise<AvailableInterventionProgramResponse> {
    return this.interventonProgramService.getAvailableInterventionPrograms(id);
  }
}
