import { Controller, UseGuards, Post, Delete, HttpCode, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthenticatedUser } from '../../users/interfaces/users.interface';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '../docs/token-response.doc';
import { User } from '../../users/decorators/user.decorator';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { BearerToken } from '../decorators/bearer-token.decorator';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { PermissionGuard } from '../guards/permission.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { PoliticResponse } from '../docs/politic-response.doc';

@ApiTags('Auth Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@User() user: IAuthenticatedUser): Promise<TokenResponse> {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @ApiBearerAuth()
  @Delete('logout')
  logout(@BearerToken() accessToken: string): Promise<any> {
    return this.authService.logout(accessToken);
  }

  @Post('refresh-token')
  @HttpCode(200)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Permissions('retrieve_politics')
  @Get('politics')
  async getPolitics(): Promise<PoliticResponse> {
    const politics = await this.authService.getPolitics();
    return { data: politics };
  }
}
