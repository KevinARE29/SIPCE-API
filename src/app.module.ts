import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EtlModule } from './etl/etl.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({ isGlobal: true }), UsersModule, AuthModule, EtlModule],
})
export class AppModule {}
