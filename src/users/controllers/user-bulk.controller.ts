import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { BulkAdministrativeDto } from '@users/dtos/bulk/bulk-administrative.dto';
import { AdministrativeBulkService } from '@users/services/administrative-bulk.service';
import { BulkCoordinatorDto } from '@users/dtos/bulk/bulk-coordinator.dto';
import { CoordinatorBulkService } from '@users/services/coordinator-bulk.service';

@ApiTags('Users Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('users')
export class UserBulkController {
  constructor(
    private readonly administrativeBulkService: AdministrativeBulkService,
    private readonly coordinatorBulkService: CoordinatorBulkService,
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
  })
  @HttpCode(204)
  @Post('coordinators')
  bulkCoordinators(@Body() bulkCoordinatorDto: BulkCoordinatorDto): Promise<void> {
    return this.coordinatorBulkService.bulkCoordinator(bulkCoordinatorDto);
  }
}
