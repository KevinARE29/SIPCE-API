import { Controller, UseGuards, Get, Query, Patch, HttpCode, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { RequestService } from '@counseling/services/request.service';
import { RequestFilterDto } from '@counseling/dtos/request-filter.dto';
import { RequestsResponse } from '@counseling/docs/requests-response.doc';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { PatchRequestDto } from '@counseling/dtos/patch-request.dto';
import { RequestIdDto } from '@counseling/dtos/request-id.dto';

@ApiTags('Counseling Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('')
export class MeRequestsController {
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

  @Auth('manage_requests')
  @ApiOperation({
    summary: 'Aceptar o rechazar solicitudes de consulta de consejería',
    description: 'Use este endpoint para aceptar o rechazar solicitudes de consulta de consejería',
  })
  @HttpCode(204)
  @Patch('me/requests/:requestId')
  patchRequest(
    @User() user: IAuthenticatedUser,
    @Param() { requestId }: RequestIdDto,
    @Body() patchRequestDto: PatchRequestDto,
  ): Promise<void> {
    return this.requestService.patchRequest(user, requestId, patchRequestDto);
  }
}
