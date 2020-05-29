import { Controller, UseGuards, Patch, HttpCode, Body } from '@nestjs/common';
import { ContentTypeGuard } from 'src/core/guards/content-type.guard';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePswDto } from 'src/auth/dtos/update-psw.dto';
import { IAuthenticatedUser } from '../interfaces/users.interface';
import { User } from '../decorators/user.decorator';
import { UsersService } from '../services/users.service';

@ApiTags('Users Endpoints')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(ContentTypeGuard, AuthGuard('jwt'), SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar contraseña',
    description: 'Use este endpoint para un usuario que ha iniciado sesión pueda actualizar su contraseña',
  })
  @Patch('me/password')
  @HttpCode(204)
  async updatePsw(@User() reqUser: IAuthenticatedUser, @Body() updatePswDto: UpdatePswDto): Promise<void> {
    const user = await this.usersService.findByIdOrThrow(reqUser.id);
    await this.usersService.updatePsw(user, updatePswDto.password);
  }
}
