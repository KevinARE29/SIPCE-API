import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SociometricTestIdDto } from '@sociometrics/dtos/sociometric-test-id.dto';
import { QuestionIdDto } from '@sociometrics/dtos/question-id.dto';
import { SociometricMatrixService } from '@sociometrics/services/sociometric-matrix.service';

@ApiTags('Sociometric Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sociometric/tests')
export class SociometricMatrixController {
  constructor(private readonly sociometricMatrixService: SociometricMatrixService) {}

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Obtener prueba sociométrica',
    description: 'Use este endpoint para obtener una prueba sociométrica específica',
  })
  @Get(':sociometricTestId/questions/:questionId')
  getSociometricMatrix(
    @Param() { sociometricTestId }: SociometricTestIdDto,
    @Param() { questionId }: QuestionIdDto,
  ): Promise<any> {
    return this.sociometricMatrixService.getSociometricMatrix(sociometricTestId, questionId);
  }
}
