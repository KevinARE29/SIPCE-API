import { Controller, UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '@auth/guards/session.guard';
import { PermissionGuard } from '@auth/guards/permission.guard';
import { Permissions } from '@auth/decorators/permissions.decorator';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { EtlService } from '../services/etl.service';

@ApiTags('ETL Endpoints')
@UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard)
@ApiBearerAuth()
@Controller('etl')
export class EtlController {
  constructor(private readonly etlService: EtlService) {}

  @ApiOperation({
    summary: 'Ejecutar Sincronización Manual de Estudiantes',
    description: 'Use este endpoint para ejecutar manualmente el ETL para la sincronización de estudiantes',
  })
  @Permissions('run_etl')
  @Post('students')
  syncStudents(@User() user: IAuthenticatedUser): Promise<void> {
    return this.etlService.syncStudents(user);
  }
}
