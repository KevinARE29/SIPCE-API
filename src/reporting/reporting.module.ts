import { ExpedientModule } from '@expedient/expedient.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JOBS_QUEUE } from './constants/reporting.constant';
import { ReportingController } from './controllers/reporting.controller';
import { Dashboard } from './entities/dashboard.view.entity';
import { PdfProcessor } from './processors/pdf.processor';
import { ReportingService } from './services/reporting.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: JOBS_QUEUE,
    }),
    TypeOrmModule.forFeature([Dashboard]),
    ExpedientModule,
  ],
  providers: [ReportingService, PdfProcessor],
  controllers: [ReportingController],
})
export class ReportingModule {}
