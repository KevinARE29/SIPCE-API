import { Controller, UseGuards, Post, Delete, HttpCode, Body, Get, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from 'src/core/guards/content-type.guard';
import { IAuthenticatedUser } from '../../users/interfaces/users.interface';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '../docs/token-response.doc';
import { User } from '../../users/decorators/user.decorator';
import { LoginDto } from '../dtos/login.dto';
import { BearerToken } from '../decorators/bearer-token.decorator';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { PermissionGuard } from '../guards/permission.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { PoliticResponse } from '../docs/politic-response.doc';
import { PolitcDto } from '../dtos/politics.dto';
import { PoliticIdDto } from '../dtos/politic-id.dto';
import { SessionGuard } from '../guards/session.guard';
import { ForgotPswDto } from '../dtos/forgot-psw.dto';

@ApiTags('Authentication Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ContentTypeGuard, AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  @ApiOperation({
    summary: 'Inicia la sesión de un usuario',
    description: 'Use este endpoint para iniciar la sesión de un usuario y obtener un par de tokens',
  })
  @Post('login')
  login(@User() user: IAuthenticatedUser): Promise<TokenResponse> {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'), SessionGuard)
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cierra la sesión de un usuario',
    description:
      'Use este endpoint para cerrar la sesión de un usuario y eliminar los tokens de la sesión activa del usuario en la Base de Datos',
  })
  @Delete('logout')
  logout(@BearerToken() accessToken: string): Promise<any> {
    return this.authService.logout(accessToken);
  }

  @UseGuards(ContentTypeGuard)
  @ApiOperation({
    summary: 'Refresca la sesión de un usuario',
    description: 'Use este endpoint para refrescar la sesión de un usuario cuando su access token haya expirado',
  })
  @Post('refresh-token')
  @HttpCode(200)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @UseGuards(ContentTypeGuard)
  @ApiOperation({
    summary: 'Solicitud de recuperación de contraseña',
    description: 'Use este endpoint para solicitar la recuperación de la contraseña de un usuario',
  })
  @Post('forgot-password')
  @HttpCode(204)
  forgotPsw(@Body() forgotPswDto: ForgotPswDto): Promise<void> {
    return this.authService.forgotPsw(forgotPswDto.email);
  }

  @UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener políticas de seguridad de contraseñas',
    description: 'Use este endpoint para obtener las políticas de seguridad de contraseñas',
  })
  @Permissions('retrieve_politics')
  @Get('politics')
  async getPolitics(): Promise<PoliticResponse> {
    const politics = await this.authService.getPolitics();
    return { data: politics };
  }

  @UseGuards(ContentTypeGuard, AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar políticas de seguridad de contraseñas',
    description: 'Use este endpoint para actualizar políticas de seguridad de contraseñas',
  })
  @Permissions('update_politics')
  @Put('politics/:politicId')
  updatePolitic(@Param() idDto: PoliticIdDto, @Body() politicDto: PolitcDto): Promise<PoliticResponse> {
    return this.authService.updatePolitic(idDto.politicId, politicDto);
  }
}
