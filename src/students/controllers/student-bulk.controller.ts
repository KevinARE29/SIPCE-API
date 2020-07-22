/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, UseGuards, Post, Body, HttpCode } from '@nestjs/common';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators/auth.decorator';
import { BulkStudentsDto } from '@students/dtos/bulk/bulk-students.dto';
import { StudentBulkService } from '@students/services/student-bulk.service';

@ApiTags('Students Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('students')
export class StudentBulkController {
  constructor(private readonly studentBulkService: StudentBulkService) {}

  @Auth('create_students')
  @ApiOperation({
    summary: 'Cargar Estudiantes',
    description: 'Use este endpoint para hacer una carga masiva de estudiantes',
  })
  @HttpCode(204)
  @Post('bulk')
  bulkStudents(@Body() bulkStudentsDto: BulkStudentsDto): Promise<void> {
    return this.studentBulkService.bulkStudent(bulkStudentsDto);
  }
}
