import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SociometricTestIdDto } from '@sociometrics/dtos/sociometric-test-id.dto';
import { QuestionIdDto } from '@sociometrics/dtos/question-id.dto';
import { SociometricMatrixService } from '@sociometrics/services/sociometric-matrix.service';
import { SociometricMatrixResponse } from '@sociometrics/docs/sociometric-matrix-response.doc';

@ApiTags('Sociometric Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sociometric/tests')
export class SociometricMatrixController {
  constructor(private readonly sociometricMatrixService: SociometricMatrixService) {}

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Obtener matriz sociométrica, valores e índices sociométricos',
    description:
      'Use este endpoint para obtener la matriz sociométrica, valores e índices sociométricos de una prueba sociométrica para una pregunta específica',
  })
  @Get(':sociometricTestId/questions/:questionId')
  getSociometricMatrix(
    @Param() { sociometricTestId }: SociometricTestIdDto,
    @Param() { questionId }: QuestionIdDto,
  ): Promise<SociometricMatrixResponse> {
    return this.sociometricMatrixService.getSociometricMatrix(sociometricTestId, questionId);
  }
}
