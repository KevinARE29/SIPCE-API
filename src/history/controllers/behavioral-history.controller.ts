import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Controller, UseGuards, Param, Body, Patch, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { AddFinalCommentDto } from '@history/dtos/add-behavioral-history-final-comment.dto';
import { BehavioralHistoryService } from '@history/services/behavioral-history.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { User } from '@users/decorators/user.decorator';
import { BehavioralHistoryResponse } from '@history/docs/behavioral-history-response.doc';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { StudentBehavioralHistoryInformationFiltersDto } from '@history/dtos/student-behavioral-history-information-filters.dto';
import { StudentBehavioralHistoryInformationResponse } from '@history/docs/student-behavioral-history-information-response.doc';

@ApiTags('Behavioral History Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('students/:studentId/histories')
export class BehavioralHistoryController {
  constructor(private readonly behavioralHistoryService: BehavioralHistoryService) {}

  @ApiOperation({
    summary: 'Obtener los historiales académicos y conductuales de un estudiante',
    description: 'Use este endpoint para obtener los historiales académicos y conductuales de un estudiante',
  })
  @Auth('retrieve_students_behavioral_history')
  @Get()
  getStudentBehavioralHistories(
    @Param() studentIdDto: StudentIdDto,
    @User() { id }: IAuthenticatedUser,
    @Query() behavioralHistoryInformationFilterDto: StudentBehavioralHistoryInformationFiltersDto,
  ): Promise<StudentBehavioralHistoryInformationResponse> {
    return this.behavioralHistoryService.getStudentBehavioralHistories(
      studentIdDto,
      id,
      behavioralHistoryInformationFilterDto,
    );
  }

  @ApiOperation({
    summary: 'Agregar comentario final a un historial académico y conductual',
    description: 'Use este endpoint para agregar comentario final a un historial académico y conductual',
  })
  @Auth('add_behavioral_history_conclusion')
  @Patch(':historyId')
  AddFinalComment(
    @User() { id }: IAuthenticatedUser,
    @Param() studentHistoryIdsDto: StudentHistoryIdsDto,
    @Body() addFinalCommentDto: AddFinalCommentDto,
  ): Promise<BehavioralHistoryResponse> {
    return this.behavioralHistoryService.addFinalComment(id, studentHistoryIdsDto, addFinalCommentDto);
  }
}
