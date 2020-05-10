import { Controller, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IAuthenticatedUser } from '../../users/interfaces/users.interface';
import { AuthService } from '../services/auth.service';
import { TokenResponse } from '../docs/token-response.doc';
import { User } from '../../users/decorators/user.decorator';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@User() user: IAuthenticatedUser): Promise<TokenResponse> {
    return this.authService.login(user);
  }
}
