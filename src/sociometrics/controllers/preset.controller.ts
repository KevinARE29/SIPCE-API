import { Controller, UseGuards, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SociometricTestIdDto } from '@sociometrics/dtos/sociometric-test-id.dto';
import { CreatePresetDto } from '@sociometrics/dtos/create-preset.dto';
import { PresetResponse } from '@sociometrics/docs/preset-response.doc';
import { PresetService } from '@sociometrics/services/preset.service';

@ApiTags('Sociometric Preset Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('sociometric/tests')
export class PresetController {
  constructor(private readonly presetService: PresetService) {}

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Agregar programación para una prueba sociométrica',
    description: 'Use este endpoint para agregar una programación para una prueba sociométrica',
  })
  @Post(':sociometricTestId/presets')
  createSociometricTestPreset(
    @Param() sociometricTestId: SociometricTestIdDto,
    @Body() createPresetDto: CreatePresetDto,
  ): Promise<PresetResponse> {
    return this.presetService.createSociometricTestPreset(sociometricTestId, createPresetDto);
  }
}
