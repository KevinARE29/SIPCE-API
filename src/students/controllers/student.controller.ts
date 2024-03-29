import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentFilterDto } from '@students/dtos/student-filter.dto';
import { StudentsResponse } from '@students/docs/students-response.doc';
import { StudentService } from '@students/services/student.service';
import { CreateStudentDto } from '@students/dtos/create-student.dto';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { StudentResponse } from '@students/docs/student-response.doc';
import { UpdateStudentDto } from '@students/dtos/update-student.dto';
import { UpdatedStudentResponse } from '@students/docs/updated-student-response.doc';

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

  @Auth('create_students')
  @ApiOperation({
    summary: 'Crear Estudiantes',
    description: 'Use este endpoint para crear nuevos estudiantes',
  })
  @Post('')
  createUser(@Body() createStudentDto: CreateStudentDto): Promise<any> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Auth('view_student')
  @ApiOperation({
    summary: 'Visualizar un estudiante específico',
    description: 'Use este endpoint para visualizar los datos de un estudiante específico',
  })
  @Get(':studentId')
  getStudent(@Param() studentIdDto: StudentIdDto): Promise<StudentResponse> {
    return this.studentService.getStudent(studentIdDto.studentId);
  }

  @Auth('update_student')
  @ApiOperation({
    summary: 'Actualizar un estudiante específico',
    description: 'Use este endpoint para actualizar los datos de un estudiante específico',
  })
  @Put(':studentId')
  updateStudent(
    @Param() studentIdDto: StudentIdDto,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<UpdatedStudentResponse> {
    return this.studentService.updateStudent(studentIdDto.studentId, updateStudentDto);
  }

  @Auth('delete_student')
  @ApiOperation({
    summary: 'Eliminar un estudiante específico',
    description: 'Use este endpoint para eliminar un estudiante específico',
  })
  @Delete(':studentId')
  deleteStudent(@Param() studentIdDto: StudentIdDto): Promise<void> {
    return this.studentService.deleteStudent(studentIdDto.studentId);
  }
}
