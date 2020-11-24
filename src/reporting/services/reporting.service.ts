import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { JOBS_QUEUE, PDF_JOB } from '@reporting/constants/reporting.constant';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Dashboard } from '@reporting/entities/dashboard.view.entity';
import { Repository } from 'typeorm';
import { DashboardResponse } from '@reporting/docs/dashboard/dashboard-response.doc';
import { plainToClass } from 'class-transformer';
import { objectToCamel } from '@core/utils/core.util';
import { SessionsReportFilterDto } from '@reporting/dtos/sessions-report.dto';
import { SessionRepository } from '@expedient/repositories/session.repository';
import { SessionsReport } from '@reporting/docs/sessions-report.doc';
import { SessionsReportResponse } from '@reporting/docs/sessions-report-response.doc';
import { PdfRequestDto } from '@reporting/dtos/pdf-request.dto';

@Injectable()
export class ReportingService {
  constructor(
    @InjectQueue(JOBS_QUEUE) private readonly jobsQueue: Queue,
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: Repository<Dashboard>,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async generatePdf(pdfRequestDto: PdfRequestDto): Promise<Buffer> {
    const job = await this.jobsQueue.add(PDF_JOB, pdfRequestDto);
    const pdfObjectBuffer = await job.finished();
    return Buffer.from(pdfObjectBuffer);
  }

  async getDashboard(): Promise<DashboardResponse> {
    const dashboard = await this.dashboardRepository.findOne();
    return plainToClass(DashboardResponse, objectToCamel(dashboard), { excludeExtraneousValues: true });
  }

  async getSessions(sessionsReportDto: SessionsReportFilterDto): Promise<SessionsReportResponse> {
    const sessions = await this.sessionRepository.getSessionsReport(sessionsReportDto);
    return {
      data: plainToClass(SessionsReport, objectToCamel(sessions) as SessionsReport[], {
        excludeExtraneousValues: true,
      }),
    };
  }
}
