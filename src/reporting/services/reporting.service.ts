import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { JOBS_QUEUE, PDF_JOB } from '@reporting/constants/reporting.constant';
import { Queue } from 'bull';

@Injectable()
export class ReportingService {
  constructor(@InjectQueue(JOBS_QUEUE) private jobsQueue: Queue) {}

  async generatePdf(): Promise<Buffer> {
    const jobData = { reportName: 'test' };
    const job = await this.jobsQueue.add(PDF_JOB, jobData);
    const pdfObjectBuffer = await job.finished();
    return Buffer.from(pdfObjectBuffer);
  }
}
