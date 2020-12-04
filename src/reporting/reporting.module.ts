import { AcademicsModule } from '@academics/academics.module';
import { ExpedientModule } from '@expedient/expedient.module';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SociometricsModule } from '@sociometrics/sociometrics.module';
import { StudentModule } from '@students/students.module';
import { HistoryModule } from '@history/history.module';
import { JOBS_QUEUE } from './constants/reporting.constant';
import { ReportingController } from './controllers/reporting.controller';
import { Dashboard } from './entities/dashboard.view.entity';
import { PdfProcessor } from './processors/pdf.processor';
import { ReportingSociometricService } from './services/reporting-sociometric.service';
import { ReportingService } from './services/reporting.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: JOBS_QUEUE,
    }),
    TypeOrmModule.forFeature([Dashboard]),
    ExpedientModule,
    StudentModule,
    HistoryModule,
    SociometricsModule,
    AcademicsModule,
  ],
  providers: [ReportingService, PdfProcessor, ReportingSociometricService],
  controllers: [ReportingController],
})
export class ReportingModule {}
