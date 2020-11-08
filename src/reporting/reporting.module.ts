import { Module } from '@nestjs/common';
import { ReportingController } from './controllers/reporting.controller';
import { ReportingService } from './services/reporting.service';

@Module({
  providers: [ReportingService],
  controllers: [ReportingController],
})
export class ReportingModule {}
