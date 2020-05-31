import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { EtlController } from './controllers/etl.controller';
import { EtlService } from './services/etl.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [EtlController],
  providers: [EtlService],
})
export class EtlModule {}
