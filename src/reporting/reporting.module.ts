import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JOBS_QUEUE } from './constants/reporting.constant';
import { ReportingController } from './controllers/reporting.controller';
import { PdfProcessor } from './processors/pdf.processor';
import { ReportingService } from './services/reporting.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: JOBS_QUEUE,
    }),
  ],
  providers: [ReportingService, PdfProcessor],
  controllers: [ReportingController],
})
export class ReportingModule {}
