import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsModule } from '@mails/mails.module';
import { UsersModule } from '@users/users.module';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenRepository, PoliticRepository, RoleRepository]),
    forwardRef(() => UsersModule),
    PassportModule,
    MailsModule,
  ],
  controllers: [AuthController, RoleController],
  providers: [AuthService, TokensService, RoleService, LocalStrategy, JwtStrategy],
  exports: [AuthService, TokensService, TypeOrmModule],
})
export class AuthModule {}
