import { Controller, UseGuards, Get, Body, Param, Patch, HttpCode, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { SociometricTestDetailService } from '@sociometrics/services/sociometric-test-detail.service';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { SociometricTestIdDto } from '@sociometrics/dtos/sociometric-test-id.dto';
import { AnswerDto } from '@sociometrics/dtos/answer.dto';
import { SociometricTestDetailResponse } from '@sociometrics/docs/sociometric-test-detail-response.doc';

@ApiTags('Sociometric Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sociometric/tests/:sociometricTestId/students')
export class SociometricTestDetailController {
  constructor(private readonly sociometricTestDetailService: SociometricTestDetailService) {}

  @ApiOperation({
    summary: 'Guardar respuestas de prueba sociométrica',
    description: 'Use este endpoint para guardar respuestas de un estudiante en una prueba sociométrica específica',
  })
  @HttpCode(204)
  @Put(':studentId')
  updateSociometricTestDetail(
    @Param() { sociometricTestId }: SociometricTestIdDto,
    @Param() { studentId }: StudentIdDto,
    @Body() answerDto: AnswerDto,
  ): Promise<void> {
    return this.sociometricTestDetailService.updateSociometricTestDetail(sociometricTestId, studentId, answerDto);
  }

  @ApiOperation({
    summary: 'Iniciar/obtener prueba sociométrica',
    description: 'Use este endpoint para iniciar/obtener una prueba sociométrica específica',
  })
  @Get(':studentId')
  getSociometricTestDetail(
    @Param() { sociometricTestId }: SociometricTestIdDto,
    @Param() { studentId }: StudentIdDto,
  ): Promise<SociometricTestDetailResponse> {
    return this.sociometricTestDetailService.getSociometricTestDetail(sociometricTestId, studentId);
  }

  @ApiOperation({
    summary: 'Finalizar prueba sociométrica',
    description: 'Use este endpoint para finalizar una prueba sociométrica específica',
  })
  @HttpCode(204)
  @Patch(':studentId')
  finishSociometricTestDetail(
    @Param() { sociometricTestId }: SociometricTestIdDto,
    @Param() { studentId }: StudentIdDto,
  ): Promise<void> {
    return this.sociometricTestDetailService.finishSociometricTestDetail(sociometricTestId, studentId);
  }
}
