import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentFilterDto } from '@students/dtos/student-filter.dto';
import { StudentsResponse } from '@students/docs/students-response.doc';
import { StudentService } from '@students/services/student.service';

@ApiTags('Students Endpoints')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Auth('retrieve_students')
  @ApiOperation({
    summary: 'Consulta general de estudiantes',
    description: 'Use este endpoint para realizar una consulta general de estudiantes',
  })
  @Get('')
  getAllStudents(@Query() pageDto: PageDto, @Query() stududentFilterDto: StudentFilterDto): Promise<StudentsResponse> {
    return this.studentService.getAllStudents(pageDto, stududentFilterDto);
  }
}
