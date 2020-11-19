import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { InterventionProgramService } from '@expedient/services/intervention-program.service';
import { InterventionProgramFilterDto } from '@expedient/dtos/intervention-program-filter.dto';
import { InterventionProgramResponse } from '@expedient/docs/intervention-program-response.doc';

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
  ): Promise<InterventionProgramResponse> {
    return this.interventonProgramService.findCounselorInterventionPrograms(id, interventionProgramFilterDto, pageDto);
  }
}
