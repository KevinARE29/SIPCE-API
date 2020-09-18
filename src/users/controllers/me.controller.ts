import { Controller, UseGuards, Get } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '@auth/guards/session.guard';
import { MeService } from '@users/services/me.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { MyProfileResponse } from '@users/docs/my-profile/my-profile-response.doc';

@ApiTags('My Profile Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @UseGuards(AuthGuard('jwt'), SessionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener información de mi perfil',
    description:
      'Use este endpoint para obtener la información del perfil del usuario que actualmente ha iniciado sesión',
  })
  @Get('')
  getMyProfile(@User() reqUser: IAuthenticatedUser): Promise<MyProfileResponse> {
    return this.meService.getMyProfile(reqUser.id);
  }
}
