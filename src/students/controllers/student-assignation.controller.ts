import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentAssignationFilterDto } from '@students/dtos/student-assignation-filter.dto';
import { StudentAssignationService } from '@students/services/student-assignation.service';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';

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
}
