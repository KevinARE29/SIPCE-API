import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ReportingService } from '../services/reporting.service';

@ApiTags('Reporting Endpoints')
@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('')
  async getAllFouls(@Res() res: Response): Promise<any> {
    const buffer = await this.reportingService.generatePdf();
    res.set({
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=test.pdf',
      'Content-Length': buffer.length,
      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });
    res.end(buffer);
  }
}
