import { Injectable } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { StudentRepository } from '@students/repositories/student.repository';
import { StudentFilterDto } from '@students/dtos/student-filter.dto';
import { StudentsResponse } from '@students/docs/students-response.doc';
import { Students } from '@students/docs/students.doc';
import { EStudentStatus } from '@students/constants/student.constant';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async getAllStudents(pageDto: PageDto, studentFilterDto: StudentFilterDto): Promise<StudentsResponse> {
    const [students, count] = await this.studentRepository.getAllStudents(pageDto, studentFilterDto);
    const pagination = getPagination(pageDto, count);
    const mappedStudents = students.map(student => ({ ...student, status: EStudentStatus[student.status] }));
    return { data: plainToClass(Students, mappedStudents, { excludeExtraneousValues: true }), pagination };
  }
}
