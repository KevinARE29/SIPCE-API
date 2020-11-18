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

@Injectable()
export class ReportingService {
  constructor(
    @InjectQueue(JOBS_QUEUE) private jobsQueue: Queue,
    @InjectRepository(Dashboard)
    private dashboardRepository: Repository<Dashboard>,
  ) {}

  async generatePdf(): Promise<Buffer> {
    const jobData = { reportName: 'test' };
    const job = await this.jobsQueue.add(PDF_JOB, jobData);
    const pdfObjectBuffer = await job.finished();
    return Buffer.from(pdfObjectBuffer);
  }

  async getDashboard(): Promise<DashboardResponse> {
    const dashboard = await this.dashboardRepository.findOne();
    return plainToClass(DashboardResponse, objectToCamel(dashboard), { excludeExtraneousValues: true });
  }
}
