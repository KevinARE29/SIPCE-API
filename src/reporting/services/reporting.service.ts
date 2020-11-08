import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ReportingService {
  private logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(ReportingService.name);
  }

  async generatePdf(): Promise<Buffer> {
    const domain = this.configService.get<string>('FRONT_URL');

    this.logger.debug(`Generate Report Name PDF`);
    const frontendUrl = `https://${domain}`;

    try {
      const startMeasurement = new Date().getTime();
      const buffer = await this.generateFromUrl(frontendUrl);
      const endMeasurement = new Date().getTime();
      const totalTime = `${(endMeasurement - startMeasurement) / 1000}s`;
      this.logger.debug(`Pdf generated (${buffer.byteLength}b) from ${frontendUrl} after ${totalTime}`);

      return buffer;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
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
      printBackground: true,
      width: `${8.5}in`,
      height: `${11}in`,
    });
    await browser.close();
    return pdfBuffer;
  }
}
