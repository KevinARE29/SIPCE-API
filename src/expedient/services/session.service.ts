import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@students/repositories';
import { plainToClass } from 'class-transformer';
import { StudentSessions } from '@expedient/docs/student-sessions.doc';
import { getPagination } from '@core/utils/pagination.util';
import { PageDto } from '@core/dtos/page.dto';
import { StudentSessionsResponse } from '@expedient/docs/student-sessions-response.doc';
import { StudentSessionsFilterDto } from '@expedient/dtos/student-sessions-filter.dto';

@Injectable()
export class SessionService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async getStudentsExpedientSessions(
    pageDto: PageDto,
    studentSessionsFilterDto: StudentSessionsFilterDto,
    counselorId: number,
  ): Promise<StudentSessionsResponse> {
    const [students, count] = await this.studentRepository.getStudentsSessionsByCounselorId(
      counselorId,
      studentSessionsFilterDto,
      pageDto,
    );
    const pagination = getPagination(pageDto, count);
    const mappedStudents = students.map(student => ({
      ...student,
      expedient: student.expedients[0],
      sessionsCounter: student.expedients[0].sessions.length,
    }));
    return { data: plainToClass(StudentSessions, mappedStudents, { excludeExtraneousValues: true }), pagination };
  }
}
