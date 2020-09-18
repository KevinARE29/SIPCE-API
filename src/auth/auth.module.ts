import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsModule } from '@mails/mails.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { TokenRepository } from './repositories/token.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PoliticRepository } from './repositories/politic.repository';
import { TokensService } from './services/token.service';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { PermissionRepository } from './repositories/permission.repository';

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
