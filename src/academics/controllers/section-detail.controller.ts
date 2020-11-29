import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SectionDetailIdDto } from '@academics/dtos/section-detail-id.dto';
import { SectionDetailStudentsResponse } from '@academics/docs/section-detail-students-response.doc';
import { SectionDetailService } from '@academics/services/section-detail.service';

@ApiTags('Sections Details Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/section-details')
export class SectionDetailController {
  constructor(private readonly sectionDetailService: SectionDetailService) {}

  @Auth('manage_sociometric_tests')
  @ApiOperation({
    summary: 'Listar estudiantes de un grado',
    description: 'Use este endpoint para listar estudiantes de un grado específico',
  })
  @Get(':sectionDetailId')
  getSectionDetailStudents(@Param() { sectionDetailId }: SectionDetailIdDto): Promise<SectionDetailStudentsResponse> {
    return this.sectionDetailService.getSectionDetailStudents(sectionDetailId);
  }
}
