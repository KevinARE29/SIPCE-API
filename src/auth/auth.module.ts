import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { TokenRepository } from './repositories/token.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PoliticRepository } from './repositories/politic.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenRepository, PoliticRepository]),
    forwardRef(() => UsersModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
