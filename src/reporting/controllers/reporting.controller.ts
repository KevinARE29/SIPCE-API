import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardResponse } from '@reporting/docs/dashboard/dashboard-response.doc';
import { SessionsReportFilterDto } from '@reporting/dtos/sessions-report.dto';
import { SessionsReportResponse } from '@reporting/docs/sessions-report-response.doc';
import { Auth } from '@auth/decorators/auth.decorator';
import { ExpedientSessionIdsDto } from '@expedient/dtos/expedient-session-ids.dto';
import { SessionService } from '@expedient/services/session.service';
import { StudentService } from '@students/services';
import { InterviewLogResponse } from '@reporting/docs/interview-log-response.doc';
import { PdfRequestDto } from '@reporting/dtos/pdf-request.dto';
import { SimpleJwt } from '@reporting/guards/simple-jwt.guard';
import { PdfRequestFilterDto } from '@reporting/dtos/pdf-request-filter.dto';
import { SociometricTestIdDto } from '@sociometrics/dtos/sociometric-test-id.dto';
import { ReportingSociometricService } from '@reporting/services/reporting-sociometric.service';
import { SociometricReportResponse } from '@reporting/docs/sociometric-test/sociometric-report-response.doc';
import { ExpedientService } from '@expedient/services/expedient.service';
import { ExpedientReportResponse } from '@reporting/docs/expedient-report-response.doc';
import { ReportingService } from '../services/reporting.service';

@ApiTags('Reporting Endpoints')
@Controller('reporting')
export class ReportingController {
  constructor(
    private readonly reportingService: ReportingService,
    private readonly reportingSociometricService: ReportingSociometricService,
    private readonly studentService: StudentService,
    private readonly sessionService: SessionService,
    private readonly expedientService: ExpedientService,
  ) {}

  @Post('')
  async generatePdf(
    @Res() res: Response,
    @Body() pdfRequestDto: PdfRequestDto,
    @Query() pdfRequestFilterDto: PdfRequestFilterDto,
  ): Promise<any> {
    const buffer = await this.reportingService.generatePdf(pdfRequestDto, pdfRequestFilterDto);
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

  @ApiOperation({
    summary: 'Consultar dashboard',
    description: 'Use este endpoint para consultar el dashboard',
  })
  @Auth()
  @Get('dashboard')
  async getDashboard(): Promise<DashboardResponse> {
    return this.reportingService.getDashboard();
  }

  @ApiOperation({
    summary: 'Generar reportes de sesiones',
    description: 'Use este endpoint para generar reportes de sesiones',
  })
  @Get('sessions')
  @Auth('generate_sessions_reports')
  getSessions(@Query() sessionsReportDto: SessionsReportFilterDto): Promise<SessionsReportResponse> {
    return this.reportingService.getSessions(sessionsReportDto);
  }

  @ApiOperation({
    summary: 'Exportar expediente psicológico de un estudiante',
    description: 'Use este endpoint para exportar expediente psicológico de un estudiante',
  })
  @UseGuards(SimpleJwt)
  @Get('students/:studentId/expedients/:expedientId')
  async getStudentExpedient(
    @Param() studentExpedientIdsDto: StudentExpedientIdsDto,
    @Query() pdfRequestFilterDto: PdfRequestFilterDto,
  ): Promise<ExpedientReportResponse> {
    const [student, expedient] = await Promise.all([
      this.studentService.getStudent(studentExpedientIdsDto.studentId),
      this.expedientService.getStudentExpedient(studentExpedientIdsDto, pdfRequestFilterDto),
    ]);

    return { data: { student: student.data, expedient } };
  }

  @ApiOperation({
    summary: 'Exportar bitácora de entrevista con padres de familia',
    description: 'Use este endpoint para exportar bitácoras de entrevista con padres de familia',
  })
  @UseGuards(SimpleJwt)
  @Get('students/:studentId/expedients/:expedientId/sessions/:sessionId')
  async getStudentExpedientSession(
    @Param() expedientSessionIdsDto: ExpedientSessionIdsDto,
  ): Promise<InterviewLogResponse> {
    const [student, session] = await Promise.all([
      this.studentService.getStudent(expedientSessionIdsDto.studentId),
      this.sessionService.getSession(expedientSessionIdsDto),
    ]);

    return { data: { student: student.data, session: session.data } };
  }

  @ApiOperation({
    summary: 'Generar reporte de pruebas sociométricas',
    description: 'Use este endpoint para generar reporte de pruebas sociométricas',
  })
  @UseGuards(SimpleJwt)
  @Get('tests/:sociometricTestId')
  async getSociometricTestReport(
    @Param() { sociometricTestId }: SociometricTestIdDto,
    @Query() { filter }: PdfRequestFilterDto,
  ): Promise<SociometricReportResponse> {
    return this.reportingSociometricService.getSociometricTestReport(sociometricTestId, filter);
  }
}
