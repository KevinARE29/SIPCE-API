/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards, Body, Get, Query } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentYearResumeFilterDto } from '@students/dtos/student-year-resume-filter.dto';
import { StudentYearResumeService } from '@students/services';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { StudentSchoolYearProgressResponse } from '@students/docs/student-school-year-progress-response.doc';

@ApiTags('Students Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('students-year-resumes')
export class StudentYearResumeController {
  constructor(private readonly studentYearResumeService: StudentYearResumeService) {}

  @Auth('assign_students')
  @ApiOperation({
    summary: 'Obtener resumen de los estudiantes',
    description: 'Use este endpoint para obtener resumen de los estudiantes',
  })
  @Get('')
  getStudentsBehavioralHistoryResume(
    @Query() studentYearResumeFilterDto: StudentYearResumeFilterDto,
    @User() { id }: IAuthenticatedUser,
  ): Promise<StudentSchoolYearProgressResponse> {
    return this.studentYearResumeService.getStudentsBehavioralHistoryResume(studentYearResumeFilterDto, id);
  }
}
