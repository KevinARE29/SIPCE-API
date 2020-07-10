import { Controller, UseGuards, Patch, HttpCode, Body, Get, Query } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '@auth/guards/session.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePswDto } from '@auth/dtos/update-psw.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { PageDto } from '@core/dtos/page.dto';
import { UserFilterDto } from '@users/dtos/user-filter.dto';
import { UsersResponse } from '@users/docs/users-response.doc';
import { IAuthenticatedUser } from '../interfaces/users.interface';
import { User } from '../decorators/user.decorator';
import { UsersService } from '../services/users.service';

@ApiTags('Users Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'), SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar contraseña',
    description: 'Use este endpoint para un usuario que ha iniciado sesión pueda actualizar su contraseña',
  })
  @Patch('me/password')
  @HttpCode(204)
  async updatePsw(@User() reqUser: IAuthenticatedUser, @Body() updatePswDto: UpdatePswDto): Promise<void> {
    const user = await this.usersService.findByIdOrThrow(reqUser.id);
    await this.usersService.updatePsw(user, updatePswDto);
  }

  @Auth('retrieve_users')
  @ApiOperation({
    summary: 'Consultar Usuarios',
    description: 'Use este endpoint para consultar los usuarios activos e inactivos',
  })
  @Get('')
  getAllUsers(@Query() pageDto: PageDto, @Query() userFilterDto: UserFilterDto): Promise<UsersResponse> {
    return this.usersService.getAllUsers(pageDto, userFilterDto);
  }
}
