import { Controller, UseGuards, Patch, HttpCode, Body, Get, Query, Post, Param, Delete, Put } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '@auth/guards/session.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdatePswDto } from '@auth/dtos/update-psw.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { PageDto } from '@core/dtos/page.dto';
import { UserFilterDto } from '@users/dtos/user-filter.dto';
import { UsersResponse } from '@users/docs/users-response.doc';
import { GenerateCredentialsDto } from '@users/dtos/generate-credentials.dto';
import { UserIdDto } from '@users/dtos/user-id.dto';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UpdateUserDto } from '@users/dtos/update-user.dto';
import { UserResponse } from '@users/docs/user-response.doc';
import { UserRepository } from '@users/repositories/users.repository';
import { IAuthenticatedUser } from '../interfaces/users.interface';
import { User } from '../decorators/user.decorator';
import { UsersService } from '../services/users.service';

@ApiTags('Users Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly usersRepository: UserRepository) {}

  @UseGuards(AuthGuard('jwt'), SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar contraseña',
    description: 'Use este endpoint para un usuario que ha iniciado sesión pueda actualizar su contraseña',
  })
  @Patch('me/password')
  @HttpCode(204)
  async updatePsw(@User() reqUser: IAuthenticatedUser, @Body() updatePswDto: UpdatePswDto): Promise<void> {
    const user = await this.usersRepository.findByIdOrThrow(reqUser.id);
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

  @Auth('create_users')
  @ApiOperation({
    summary: 'Crear Usuarios',
    description: 'Use este endpoint para crear nuevos usuarios',
  })
  @Post('')
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.createUser(createUserDto);
  }

  @Auth('view_user')
  @ApiOperation({
    summary: 'Ver detalle de Usuario',
    description: 'Use este endpoint para ver el detalle de un usuario específico',
  })
  @Get(':userId')
  getSingleUser(@Param() idDto: UserIdDto): Promise<UserResponse> {
    return this.usersService.getSingleUser(idDto.userId);
  }

  @Auth('update_user')
  @ApiOperation({
    summary: 'Actualizar Usuario',
    description: 'Use este endpoint para actualizar usuarios',
  })
  @Put(':userId')
  updateUser(@Param() idDto: UserIdDto, @Body() updateUserDto: UpdateUserDto): Promise<UserResponse> {
    return this.usersService.updateUser(idDto.userId, updateUserDto);
  }

  @Auth('generate_user_credentials')
  @ApiOperation({
    summary: 'Generar Credenciales de Usuarios',
    description: 'Use este endpoint para generar credenciales a usuarios recién registrados',
  })
  @HttpCode(204)
  @Post('credentials')
  generateCredentials(@Body() generateCredentialsDto: GenerateCredentialsDto): Promise<void> {
    return this.usersService.generateCredentials(generateCredentialsDto);
  }

  @Auth('delete_user')
  @ApiOperation({
    summary: 'Eliminar Usuario',
    description: 'Use este endpoint para eliminar un usuario específico',
  })
  @HttpCode(204)
  @Delete(':userId')
  deleteUser(@Param() idDto: UserIdDto): Promise<void> {
    return this.usersService.deleteUser(idDto.userId);
  }
}
