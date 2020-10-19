import { Controller, UseGuards, Query, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { RequestService } from '@counseling/services/request.service';
import { GenerateRequestDto } from '@counseling/dtos/generate-request.dto';
import { ConfirmationTokenDto } from '@counseling/dtos/confirmation-token.dto';

@ApiTags('Counseling Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('counseling/requests')
export class CounselingRequestsController {
  constructor(private readonly requestService: RequestService) {}

  @ApiOperation({
    summary: 'Generar una solicitud de consulta de consejería',
    description: 'Use este endpoint para generar una solicitud de consulta de consejería',
  })
  @Post('')
  create(@Body() generateRequestDto: GenerateRequestDto): Promise<void> {
    return this.requestService.generateRequest(generateRequestDto);
  }

  @ApiOperation({
    summary: 'Confirmar solicitud de consulta de consejería',
    description: 'Use este endpoint para confirmar solicitud de consulta de consejería',
  })
  @Post('verification')
  @HttpCode(204)
  confirmRequest(@Query() confirmationTokenDto: ConfirmationTokenDto): Promise<void> {
    return this.requestService.confirmRequest(confirmationTokenDto);
  }
}
