import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { BulkAdministrativeDto } from '@users/dtos/bulk/bulk-administrative.dto';
import { AdministrativeBulkService } from '@users/services/administrative-bulk.service';

@ApiTags('Users Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('users')
export class UserBulkController {
  constructor(private readonly administrativeBulkService: AdministrativeBulkService) {}

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
}
