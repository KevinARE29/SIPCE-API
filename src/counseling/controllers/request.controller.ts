import { Controller, UseGuards, Get, Query, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { RequestService } from '@counseling/services/request.service';
import { GenerateRequestDto } from '@counseling/dtos/generate-request.dto';
import { ConfirmationTokenDto } from '@counseling/dtos/confirmation-token.dto';
import { RequestFilterDto } from '@counseling/dtos/request-filter.dto';
import { RequestsResponse } from '@counseling/docs/requests-response.doc';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';

@ApiTags('Counseling Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('counseling')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Auth('manage_requests')
  @ApiOperation({
    summary: 'Listar Solicitudes de Consulta de Consejería',
    description: 'Use este endpoint para listar las solicitudes de consulta de consejería en un grado específico',
  })
  @Get('me/requests')
  getRequests(
    @User() { id: userId }: IAuthenticatedUser,
    @Query() pageDto: PageDto,
    @Query() requestFilterDto: RequestFilterDto,
  ): Promise<RequestsResponse> {
    return this.requestService.getRequests(userId, pageDto, requestFilterDto);
  }

  @ApiOperation({
    summary: 'Generar una solicitud de consulta de consejería',
    description: 'Use este endpoint para generar una solicitud de consulta de consejería',
  })
  @Post('requests')
  create(@Body() generateRequestDto: GenerateRequestDto): Promise<void> {
    return this.requestService.generateRequest(generateRequestDto);
  }

  @ApiOperation({
    summary: 'Confirmar solicitud de consulta de consejería',
    description: 'Use este endpoint para confirmar solicitud de consulta de consejería',
  })
  @Post('requests/verification')
  @HttpCode(204)
  confirmRequest(@Query() confirmationTokenDto: ConfirmationTokenDto): Promise<void> {
    return this.requestService.confirmRequest(confirmationTokenDto);
  }
}
