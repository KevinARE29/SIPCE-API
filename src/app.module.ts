import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from '@logs/log.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({ isGlobal: true }), UsersModule, AuthModule, LogModule],
})
export class AppModule {}
