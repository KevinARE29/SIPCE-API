import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { BulkUsersDto } from '@users/dtos/bulk/bulk-users.dto';
import { UsersBulkService } from '@users/services/users-bulk.service';

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
}
