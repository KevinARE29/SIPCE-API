import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { DashboardResponse } from '@reporting/docs/dashboard/dashboard-response.doc';
import { SessionsReportFilterDto } from '@reporting/dtos/sessions-report.dto';
import { SessionsReportResponse } from '@reporting/docs/sessions-report-response.doc';
import { Auth } from '@auth/decorators/auth.decorator';
import { ReportingService } from '../services/reporting.service';

@ApiTags('Reporting Endpoints')
@Controller('reporting')
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('')
  async generatePdf(@Res() res: Response): Promise<any> {
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

  @Get('dashboard')
  async getDashboard(): Promise<DashboardResponse> {
    return this.reportingService.getDashboard();
  }

  @Get('sessions')
  @Auth('generate_sessions_reports')
  getSessions(@Query() sessionsReportDto: SessionsReportFilterDto): Promise<SessionsReportResponse> {
    return this.reportingService.getSessions(sessionsReportDto);
  }
}
