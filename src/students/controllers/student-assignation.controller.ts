import { Controller, Get, Query, Patch, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentAssignationFilterDto } from '@students/dtos/student-assignation-filter.dto';
import { StudentAssignationService } from '@students/services/student-assignation.service';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { PatchStudentAssignationDto } from '@students/dtos/patch-student-assignation.dto';

@ApiTags('Students Endpoints')
@Controller('students-assignation')
export class StudentAssignationController {
  constructor(private readonly studentAssignationService: StudentAssignationService) {}

  @Auth('assign_students')
  @ApiOperation({
    summary: 'Consultar asignación de estudiantes',
    description: 'Use este endpoint para consultar la asignación de estudiantes',
  })
  @Get('')
  async getStudentsAssignation(
    @User() reqUser: IAuthenticatedUser,
    @Query() studentAssignationFilterDto: StudentAssignationFilterDto,
  ): Promise<any> {
    return this.studentAssignationService.getStudentsAssignation(reqUser.id, studentAssignationFilterDto);
  }

  @Auth('assign_students')
  @ApiOperation({
    summary: 'Vincular/Desvincular estudiantes',
    description: 'Use este endpoint para vincular o desvincular estudiantes a un docente en un año escolar',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('')
  async patchStudentsAssignation(
    @User() reqUser: IAuthenticatedUser,
    @Query() studentAssignationFilterDto: StudentAssignationFilterDto,
    @Body() patchStudentAssignationDto: PatchStudentAssignationDto,
  ): Promise<void> {
    return this.studentAssignationService.patchStudentsAssignation(
      reqUser.id,
      studentAssignationFilterDto,
      patchStudentAssignationDto,
    );
  }
}
