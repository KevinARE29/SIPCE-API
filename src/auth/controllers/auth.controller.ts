import { Controller, UseGuards, Post, Delete, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthenticatedUser } from '../../users/interfaces/users.interface';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '../docs/token-response.doc';
import { User } from '../../users/decorators/user.decorator';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { BearerToken } from '../decorators/bearer-token.decorator';
import { SessionGuard } from '../guards/session.guard';

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

  @UseGuards(SessionGuard)
  @HttpCode(204)
  @ApiBearerAuth()
  @Delete('logout')
  logout(@BearerToken() accessToken: string): Promise<any> {
    return this.authService.logout(accessToken);
  }
}
