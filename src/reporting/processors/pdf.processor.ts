import { Processor, Process, OnQueueActive, OnQueueCompleted } from '@nestjs/bull';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as puppeteer from 'puppeteer';
import { ConfigService } from '@nestjs/config';
import { JOBS_QUEUE, PDF_JOB } from '@reporting/constants/reporting.constant';
import { PdfRequestDto } from '@reporting/dtos/pdf-request.dto';
import { sign } from 'jsonwebtoken';

@Processor(JOBS_QUEUE)
export class PdfProcessor {
  private logger: Logger = new Logger(PdfProcessor.name);

  private frontendUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.frontendUrl = this.configService.get<string>('FRONT_URL', '');
  }

  @Process(PDF_JOB)
  async generatePdf(job: Job<PdfRequestDto>): Promise<Buffer> {
    this.logger.debug(`Generate Report ${job.data.reportName} PDF`);

    const token = sign({}, this.configService.get<string>('JWT_SECRET_REPORT', ''), { expiresIn: '1min' });
    const reportUrl = `https://${this.frontendUrl}/${job.data.reportPath}?token=${token}`;

    try {
      const startMeasurement = new Date().getTime();
      const buffer = await this.generateFromUrl(reportUrl);
      const endMeasurement = new Date().getTime();
      const totalTime = `${(endMeasurement - startMeasurement) / 1000}s`;
      this.logger.debug(`Pdf generated (${buffer.byteLength}b) from ${reportUrl} after ${totalTime}`);

      return buffer;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    this.logger.log(`Job ${job.id} of type ${job.name} successfully completed`);
  }

  async generateFromUrl(url: string): Promise<Buffer> {
    this.logger.debug(`Launching browser`);
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
      ],
    });
    this.logger.debug(`Browser launched`);
    const page = await browser.newPage();
    await page.emulateMediaType('screen');
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForSelector('div[class^=ant-card-body]', {
      visible: true,
    });
    const pdfBuffer = await page.pdf({
      displayHeaderFooter: true,
      printBackground: true,
      format: 'Letter',
      footerTemplate:
        '<div style="text-align: right;width: 297mm;font-size: 8px;"><span style="margin-right: 1cm">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span></div>',
      margin: { top: '20px', right: '20px', bottom: '70px', left: '20px' },
    });
    await browser.close();
    return pdfBuffer;
  }
}
