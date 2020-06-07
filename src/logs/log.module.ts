import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from './controllers/log.controller';
import { LogService } from './services/log.service';
import { AccessLogRepository } from './repositories/access-log.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccessLogRepository])],
  controllers: [LogController],
  providers: [LogService],
  exports: [TypeOrmModule],
})
export class LogModule {}
