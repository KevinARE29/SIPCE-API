import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from './controllers/log.controller';
import { LogService } from './services/log.service';
import { AccessLog } from './entities/access-log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccessLog])],
  controllers: [LogController],
  providers: [LogService],
  exports: [TypeOrmModule],
})
export class LogModule {}
