import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentRepository } from '@students/repositories';
import { plainToClass } from 'class-transformer';
import { StudentSessions } from '@expedient/docs/student-sessions.doc';
import { getPagination } from '@core/utils/pagination.util';
import { PageDto } from '@core/dtos/page.dto';
import { StudentSessionsResponse } from '@expedient/docs/student-sessions-response.doc';
import { StudentSessionsFilterDto } from '@expedient/dtos/student-sessions-filter.dto';
import { StudentExpedientIdsDto } from '@expedient/dtos/student-expedient-ids.dto';
import { ExpedientRepository } from '@expedient/repositories/expedient.repository';
import { CreateSessionDto } from '@expedient/dtos/create-session.dto';
import { Session } from '@expedient/entities/session.entity';
import { sessionTypeValue, serviceTypeValue } from '@expedient/constants/session.constants';
import { SessionRepository } from '@expedient/repositories/session.repository';
import { UserRepository } from '@users/repositories/users.repository';
import { CompleteSessionResponse } from '@expedient/docs/complete-session-response.doc';
import { CompleteSession } from '@expedient/docs/complete-session.doc';
import { EvaluationService } from './evaluation.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly expedientRepository: ExpedientRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly evaluationService: EvaluationService,
    private readonly userRepository: UserRepository,
  ) {}

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
    const mappedStudents = students
      .filter(student => student.expedients[0])
      .map(student => ({
        ...student,
        expedient: student.expedients[0],
        sessionsCounter: student.expedients[0].sessions.length,
      }));
    return { data: plainToClass(StudentSessions, mappedStudents, { excludeExtraneousValues: true }), pagination };
  }

  async createStudentExpedientSession(
    studentExpedientIdsDto: StudentExpedientIdsDto,
    createSessionDto: CreateSessionDto,
  ): Promise<CompleteSessionResponse> {
    const studentExpedient = await this.expedientRepository.findExpedientByStudentId(studentExpedientIdsDto);
    if (!studentExpedient) {
      throw new NotFoundException('El expediente no pertenece al estudiante especificado');
    }
    const { participants, evaluations, serviceType, sessionType, ...sessionData } = createSessionDto;
    const sessionToSave: Partial<Session> = {
      ...sessionData,
      serviceType: serviceTypeValue(serviceType),
      sessionType: sessionTypeValue(sessionType),
      expedient: studentExpedient,
    };
    if (participants?.length) {
      sessionToSave.counselor = await this.userRepository.findSessionParticipants(participants);
    }
    const session = await this.sessionRepository.save(sessionToSave);
    if (evaluations) {
      const savedEvaluations = await this.evaluationService.createEvaluation(session, evaluations);
      session.evaluations = savedEvaluations;
    }
    this.sessionRepository.save(session);
    return { data: plainToClass(CompleteSession, session, { excludeExtraneousValues: true }) };
  }
}
