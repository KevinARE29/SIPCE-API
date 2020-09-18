/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { BulkUsersDto } from '@users/dtos/bulk/bulk-users.dto';
import { UsersBulkService } from '@users/services/users-bulk.service';
import { BulkCoordinatorDto } from '@users/dtos/bulk/bulk-coordinator.dto';
import { BulkTeacherDto } from '@users/dtos/bulk/bulk-teacher.dto';
import { BulkCounselorDto } from '@users/dtos/bulk/bulk-counselor.dto';

@ApiTags('Users Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('users')
export class UserBulkController {
  constructor(private readonly usersBulkService: UsersBulkService) {}

  @Auth('create_users')
  @ApiOperation({
    summary: 'Cargar Usuarios',
    description: 'Use este endpoint para hacer una carga masiva de usuarios',
  })
  @HttpCode(204)
  @Post('bulk')
  bulkUsers(@Body() bulkusersDto: BulkUsersDto): Promise<void> {
    return this.usersBulkService.bulkUsers(bulkusersDto.users);
  }

  @Auth('create_users')
  @ApiOperation({
    summary: 'Cargar Usuarios Coordinadores de Ciclo',
    description: 'Use este endpoint para hacer una carga masiva de usuarios coordinadores de ciclo',
    deprecated: true,
  })
  @HttpCode(204)
  @Post('coordinators')
  bulkCoordinators(@Body() bulkCoordinatorDto: BulkCoordinatorDto): void {
    // return this.coordinatorBulkService.bulkCoordinator(bulkCoordinatorDto);
  }

  @Auth('create_users')
  @ApiOperation({
    summary: 'Cargar Usuarios Orientadores',
    description: 'Use este endpoint para hacer una carga masiva de usuarios orientadores',
    deprecated: true,
  })
  @HttpCode(204)
  @Post('counselors')
  bulkCounselors(@Body() bulkCounselorDto: BulkCounselorDto): void {
    // return this.counselorBulkService.bulkCounselor(bulkCounselorDto);
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
  bulkTeachers(@Body() bulkTeacherDto: BulkTeacherDto): void {
    // return this.teacherBulkService.bulkTeacher(bulkTeacherDto);
  }
}
