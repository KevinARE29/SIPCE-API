import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SessionService } from '@expedient/services/session.service';
import { PageDto } from '@core/dtos/page.dto';
import { StudentSessionsResponse } from '@expedient/docs/student-sessions-response.doc';
import { StudentSessionsFilterDto } from '@expedient/dtos/student-sessions-filter.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';

@ApiTags('Sessions Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({
    summary: 'Consulta de los estudiantes con la cantidad de sesiones realizadas',
    description: 'Use este endpoint para consultar los estudiantes con su respectivo contador de sesiones',
  })
  @Auth('manage_expedient')
  @Get()
  getStudentsExpedientSessions(
    @Query() pageDto: PageDto,
    @Query() studentSessionsFilterDto: StudentSessionsFilterDto,
    @User() { id }: IAuthenticatedUser,
  ): Promise<StudentSessionsResponse> {
    return this.sessionService.getStudentsExpedientSessions(pageDto, studentSessionsFilterDto, id);
  }
}
