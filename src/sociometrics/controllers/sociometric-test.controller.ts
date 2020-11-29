import { Controller, UseGuards, Get, Query, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { SociometricTestFilterDto } from '@sociometrics/dtos/sociometric-test-filter.dto';
import { SociometricTestsResponse } from '@sociometrics/docs/sociometric-tests-response.doc';
import { SociometricTestService } from '@sociometrics/services/sociometric-test.service';
import { SociometricTestResponse } from '@sociometrics/docs/sociometric-test-response.doc';
import { SociometricTestDto } from '@sociometrics/dtos/sociometric-test.dto';
import { SociometricTestIdDto } from '@sociometrics/dtos/sociometric-test-id.dto';

@ApiTags('Sociometric Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sociometric/tests')
export class SociometricTestController {
  constructor(private readonly sociometricTestService: SociometricTestService) {}

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Listar pruebas sociométricas',
    description: 'Use este endpoint para listar las pruebas sociométricas asociadas al usuario autenticado',
  })
  @Get('')
  getAllSociometricTests(
    @User() { id }: IAuthenticatedUser,
    @Query() pageDto: PageDto,
    @Query() sociometricTestFilterDto: SociometricTestFilterDto,
  ): Promise<SociometricTestsResponse> {
    return this.sociometricTestService.getAllSociometricTests(id, pageDto, sociometricTestFilterDto);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Crear prueba sociométrica',
    description: 'Use este endpoint para crear una prueba sociométrica',
  })
  @Post('')
  createSociometricTest(
    @User() { id }: IAuthenticatedUser,
    @Body() sociometricTestDto: SociometricTestDto,
  ): Promise<SociometricTestResponse> {
    return this.sociometricTestService.createSociometricTest(id, sociometricTestDto);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Obtener prueba sociométrica',
    description: 'Use este endpoint para obtener una prueba sociométrica específica',
  })
  @Get(':sociometricTestId')
  getSociometricTest(
    @User() { id }: IAuthenticatedUser,
    @Param() { sociometricTestId }: SociometricTestIdDto,
  ): Promise<SociometricTestResponse> {
    return this.sociometricTestService.getSociometricTest(id, sociometricTestId);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Actualizar prueba sociométrica',
    description: 'Use este endpoint para actualizar una prueba sociométrica',
  })
  @Put(':sociometricTestId')
  updateSociometricTest(
    @User() { id }: IAuthenticatedUser,
    @Param() { sociometricTestId }: SociometricTestIdDto,
    @Body() sociometricTestDto: SociometricTestDto,
  ): Promise<SociometricTestResponse> {
    return this.sociometricTestService.updateSociometricTest(id, sociometricTestId, sociometricTestDto);
  }

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Eliminar una prueba sociométrica',
    description: 'Use este endpoint para eliminar una prueba sociométrica específica',
  })
  @HttpCode(204)
  @Delete(':sociometricTestId')
  deleteSociometricTest(
    @User() { id }: IAuthenticatedUser,
    @Param() { sociometricTestId }: SociometricTestIdDto,
  ): Promise<void> {
    return this.sociometricTestService.deleteSociometricTest(id, sociometricTestId);
  }
}
