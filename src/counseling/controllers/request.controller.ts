import { Controller, UseGuards, Get, Query, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { RequestService } from '@counseling/services/request.service';
import { GenerateRequestDto } from '@counseling/dtos/generate-request.dto';
import { ConfirmationTokenDto } from '@counseling/dtos/confirmation-token.dto';

@ApiTags('Counseling Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('counseling/requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  /* @Auth('retrieve_requests')
  @ApiOperation({
    summary: 'Listar Solicitudes de Consulta de Consejería',
    description: 'Use este endpoint para listar las solicitudes de consulta de consejería en un grado específico',
  })
  @Get('')
  getRequests(@Query() pageDto: PageDto, @Query() requestFilterDto: RequestFilterDto): Promise<RequestResponse> {
    return this.requestService.getRequests(pageDto, requestFilterDto);
  } */

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
