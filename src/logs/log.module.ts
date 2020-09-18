import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from './controllers/log.controller';
import { LogService } from './services/log.service';
import { AccessLogRepository } from './repositories/access-log.repository';
import { ActionLogRepository } from './repositories/action-log.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccessLogRepository, ActionLogRepository])],
  controllers: [LogController],
  providers: [LogService],
  exports: [TypeOrmModule, LogService],
})
export class LogModule {}
