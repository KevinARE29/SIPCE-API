import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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
import { EnumSessionType } from '@expedient/constants/session.constants';
import { SessionRepository } from '@expedient/repositories/session.repository';
import { UserRepository } from '@users/repositories/users.repository';
import { CompleteSessionResponse } from '@expedient/docs/complete-session-response.doc';
import { CompleteSession } from '@expedient/docs/complete-session.doc';
import { ExpedientSessionIdsDto } from '@expedient/dtos/expedient-session-ids.dto';
import { getSessionsCounter } from '@expedient/utils/session.util';
import { EvaluationService } from './evaluation.service';
import { SessionResponsibleAssistenceService } from './session-responsible-assistence.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly expedientRepository: ExpedientRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly evaluationService: EvaluationService,
    private readonly userRepository: UserRepository,
    private readonly sessionResponsibleAssistenceService: SessionResponsibleAssistenceService,
  ) {}

  async getStudentsExpedientSessions(
    pageDto: PageDto,
    studentSessionsFilterDto: StudentSessionsFilterDto,
    counselorId: number,
  ): Promise<StudentSessionsResponse> {
    const students = await this.studentRepository.getStudentsSessionsByCounselorId(
      counselorId,
      studentSessionsFilterDto,
      pageDto,
    );
    const mappedStudents = students
      .filter(student => student.expedients[0])
      .map(student => ({
        ...student,
        expedient: student.expedients[0],
        sessionsCounter: getSessionsCounter(student.expedients[0].sessions),
      }));
    const pagination = getPagination(pageDto, mappedStudents.length);
    return { data: plainToClass(StudentSessions, mappedStudents, { excludeExtraneousValues: true }), pagination };
  }

  async createStudentExpedientSession(
    studentExpedientIdsDto: StudentExpedientIdsDto,
    createSessionDto: CreateSessionDto,
  ): Promise<CompleteSessionResponse> {
    const saveSessionValidation = this.getSessionTypeValidation(createSessionDto);
    if (!saveSessionValidation) {
      throw new UnprocessableEntityException('No se han agregado los campos minimos para guardar esta sesión');
    }
    const { participants, evaluations, responsibles, otherResponsible, draft, ...sessionData } = createSessionDto;
    const studentExpedient = await this.expedientRepository.findExpedientByStudentId(studentExpedientIdsDto);
    if (!studentExpedient) {
      throw new NotFoundException('El expediente no pertenece al estudiante especificado');
    }
    const sessionToSave: Partial<Session> = {
      ...sessionData,
      expedient: studentExpedient,
    };
    if (!draft) {
      const identifier = await this.sessionRepository.assignSessionIdentifier(sessionData.sessionType);
      sessionToSave.identifier = identifier;
    }
    if (participants?.length) {
      sessionToSave.counselor = await this.userRepository.findSessionParticipants(participants);
    }
    const session = await this.sessionRepository.save(sessionToSave);
    if (evaluations?.length) {
      const savedEvaluations = await this.evaluationService.createEvaluation(session, evaluations);
      session.evaluations = savedEvaluations;
    }
    if (responsibles?.length) {
      const savedSessionResponsibleAssistence = await this.sessionResponsibleAssistenceService.createSessionResponsibleAssistence(
        session,
        otherResponsible,
        responsibles,
        studentExpedientIdsDto.studentId,
      );
      session.sessionResponsibleAssistence = savedSessionResponsibleAssistence;
    }
    this.sessionRepository.save(session);
    return { data: plainToClass(CompleteSession, session, { excludeExtraneousValues: true }) };
  }

  getSessionTypeValidation(createSessionDto: CreateSessionDto): boolean {
    const { sessionType, participants, treatedTopics, agreements, responsibles, startHour } = createSessionDto;
    switch (sessionType) {
      case EnumSessionType.ENTREVISTA_DOCENTE:
        return !!participants?.length;
      case EnumSessionType.ENTREVISTA_PADRES_DE_FAMILIA:
        return !!(startHour && treatedTopics && agreements && responsibles?.length);
      default:
        return true;
    }
  }

  async deleteSession(expedientSessionIdsDto: ExpedientSessionIdsDto): Promise<void> {
    const session = await this.sessionRepository.findSession(expedientSessionIdsDto);
    if (!session) {
      throw new NotFoundException('La sesión especificada no existe');
    }
    if (!session.draft) {
      throw new UnprocessableEntityException('Esta sesión no puede ser borrada, ya que no es un borrador');
    }
    session.deletedAt = new Date();
    this.sessionRepository.save(session);
  }
}
