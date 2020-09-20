import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsModule } from '@mails/mails.module';
import { AuthController, RoleController, PermissionController } from './controllers';
import { TokenRepository, PoliticRepository, RoleRepository, PermissionRepository } from './repositories';
import { AuthService, TokensService, RoleService, PermissionService } from './services';
import { LocalStrategy, JwtStrategy } from './strategies';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([TokenRepository, PoliticRepository, RoleRepository, PermissionRepository]),
    PassportModule,
    MailsModule,
  ],
  controllers: [AuthController, RoleController, PermissionController],
  providers: [AuthService, TokensService, RoleService, PermissionService, LocalStrategy, JwtStrategy],
  exports: [AuthService, TokensService, TypeOrmModule],
})
export class AuthModule {}
