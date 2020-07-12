import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { BulkAdministrativeDto } from '@users/dtos/bulk/bulk-administrative.dto';
import { AdministrativeBulkService } from '@users/services/administrative-bulk.service';
import { BulkCoordinatorDto } from '@users/dtos/bulk/bulk-coordinator.dto';
import { CoordinatorBulkService } from '@users/services/coordinator-bulk.service';
import { BulkTeacherDto } from '@users/dtos/bulk/bulk-teacher.dto';
import { TeacherBulkService } from '@users/services/teacher-bulk.service';
import { BulkCounselorDto } from '@users/dtos/bulk/bulk-counselor.dto';
import { CounselorBulkService } from '@users/services/counselor-bulk.service';

@ApiTags('Users Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('users')
export class UserBulkController {
  constructor(
    private readonly administrativeBulkService: AdministrativeBulkService,
    private readonly coordinatorBulkService: CoordinatorBulkService,
    private readonly counselorBulkService: CounselorBulkService,
    private readonly teacherBulkService: TeacherBulkService,
  ) {}

  @Auth('create_users')
  @ApiOperation({
    summary: 'Cargar Usuarios Administrativos',
    description: 'Use este endpoint para hacer una carga masiva de usuarios administrativos',
  })
  @HttpCode(204)
  @Post('administratives')
  bulkAdministratives(@Body() bulkAdministrativeDto: BulkAdministrativeDto): Promise<void> {
    return this.administrativeBulkService.bulkAdministratives(bulkAdministrativeDto.administratives);
  }

  @Auth('create_users')
  @ApiOperation({
    summary: 'Cargar Usuarios Coordinadores de Ciclo',
    description: 'Use este endpoint para hacer una carga masiva de usuarios coordinadores de ciclo',
    deprecated: true,
  })
  @HttpCode(204)
  @Post('coordinators')
  bulkCoordinators(@Body() bulkCoordinatorDto: BulkCoordinatorDto): Promise<void> {
    return this.coordinatorBulkService.bulkCoordinator(bulkCoordinatorDto);
  }

  @Auth('create_users')
  @ApiOperation({
    summary: 'Cargar Usuarios Orientadores',
    description: 'Use este endpoint para hacer una carga masiva de usuarios orientadores',
    deprecated: true,
  })
  @HttpCode(204)
  @Post('counselors')
  bulkCounselors(@Body() bulkCounselorDto: BulkCounselorDto): Promise<void> {
    return this.counselorBulkService.bulkCounselor(bulkCounselorDto);
  }

  @Auth('create_users')
  @ApiOperation({
    summary: 'Cargar Usuarios Docentes',
    description:
      'Use este endpoint para hacer una carga masiva de usuarios docentes y ' +
      'realizar la asignación de grados y secciones del actual año escolar',
    deprecated: true,
  })
  @HttpCode(204)
  @Post('teachers')
  bulkTeachers(@Body() bulkTeacherDto: BulkTeacherDto): Promise<void> {
    return this.teacherBulkService.bulkTeacher(bulkTeacherDto);
  }
}
