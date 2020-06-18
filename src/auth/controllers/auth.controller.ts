import {
  Controller,
  UseGuards,
  Post,
  Delete,
  HttpCode,
  Body,
  Get,
  Put,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { UsersService } from '@users/services/users.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { AuthService } from '@auth/services/auth.service';
import { TokenResponse } from '@auth/docs/token-response.doc';
import { User } from '@users/decorators/user.decorator';
import { LoginDto } from '@auth/dtos/login.dto';
import { BearerToken } from '@auth/decorators/bearer-token.decorator';
import { RefreshTokenDto } from '@auth/dtos/refresh-token.dto';
import { PoliticResponse } from '@auth/docs/politic-response.doc';
import { PolitcDto } from '@auth/dtos/politics.dto';
import { PoliticIdDto } from '@auth/dtos/politic-id.dto';
import { SessionGuard } from '@auth/guards/session.guard';
import { ForgotPswDto } from '@auth/dtos/forgot-psw.dto';
import { ResetPswTokenDto } from '@auth/dtos/reset-psw-token.dto';
import { AccessLogInterceptor } from '@logs/interceptors/access-log.interceptor';
import { Auth } from '@auth/decorators/auth.decorator';
import { ResetPswDto } from '@auth/dtos/reset-psw.dto';

@ApiTags('Authentication Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @UseInterceptors(AccessLogInterceptor)
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

  @ApiOperation({
    summary: 'Refresca la sesión de un usuario',
    description: 'Use este endpoint para refrescar la sesión de un usuario cuando su access token haya expirado',
  })
  @Post('refresh-token')
  @HttpCode(200)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @ApiOperation({
    summary: 'Solicitud de recuperación de contraseña',
    description: 'Use este endpoint para solicitar la recuperación de la contraseña de un usuario',
  })
  @Post('forgot-password')
  @HttpCode(204)
  forgotPsw(@Body() forgotPswDto: ForgotPswDto): Promise<void> {
    return this.authService.forgotPsw(forgotPswDto.email);
  }

  @ApiOperation({
    summary: 'Obtener políticas de seguridad de contraseñas',
    description: 'Use este endpoint para obtener las políticas de seguridad de contraseñas',
  })
  @Get('politics')
  async getPolitics(): Promise<PoliticResponse> {
    const politics = await this.authService.getPolitics();
    return { data: politics };
  }

  @Auth('update_politics')
  @ApiOperation({
    summary: 'Actualizar políticas de seguridad de contraseñas',
    description: 'Use este endpoint para actualizar políticas de seguridad de contraseñas',
  })
  @Put('politics/:politicId')
  updatePolitic(@Param() idDto: PoliticIdDto, @Body() politicDto: PolitcDto): Promise<PoliticResponse> {
    return this.authService.updatePolitic(idDto.politicId, politicDto);
  }

  @ApiOperation({
    summary: 'Restablecimiento de una contraseña',
    description:
      'Use este endpoint para que un usuario pueda restablecer su contraseña usando su reset password token vigente',
  })
  @Post('reset-password')
  @HttpCode(204)
  resetPsw(@Query() resetPswTokenDto: ResetPswTokenDto, @Body() resetPswDto: ResetPswDto): Promise<void> {
    return this.usersService.resetPsw(resetPswTokenDto, resetPswDto);
  }
}
