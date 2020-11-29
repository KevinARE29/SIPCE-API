import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { BehavioralHistoryService } from '@history/services/behavioral-history.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { PageDto } from '@core/dtos/page.dto';
import { StudentsBehavioralHistoryResponse } from '@history/docs/students-behavioral-history-response.doc';
import { StudentsBehavioralHistoryFilterDto } from '@history/dtos/students-behavioral-history-filter.dto';

@ApiTags('Me - Behavioral History Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('behavioral-histories')
export class MeBehavioralHistoryController {
  constructor(private readonly behavioralHistoryService: BehavioralHistoryService) {}

  @ApiOperation({
    summary: 'Obtener listado de alumnos con contadores de historiales académicos y conductuales',
    description:
      'Use este endpoint para obtener listado de alumnos con contadores de historiales académicos y conductuales',
  })
  @Auth('retrieve_students_behavioral_history')
  @Get('')
  getStudentsBehavioralHistory(
    @User() { id }: IAuthenticatedUser,
    @Query() studentsBehavioralHistoryFilterDto: StudentsBehavioralHistoryFilterDto,
    @Query() pageDto: PageDto,
  ): Promise<StudentsBehavioralHistoryResponse> {
    return this.behavioralHistoryService.getStudentsBehavioralHistories(
      id,
      pageDto,
      studentsBehavioralHistoryFilterDto,
    );
  }
}
