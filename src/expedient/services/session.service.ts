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
import { UpdateSessionDto } from '@expedient/dtos/update-session.dto';
import { Responsible } from '@students/entities/responsible.entity';
import { ResponsibleService } from '@students/services';
import { EResponsibleRelationship } from '@students/constants/student.constant';
import { SessionResponsibleAssistence } from '@expedient/entities/session-responsible-assistence.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EvaluationService } from './evaluation.service';
import { SessionResponsibleAssistenceService } from './session-responsible-assistence.service';
import { InterventionProgramService } from './intervention-program.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly expedientRepository: ExpedientRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly evaluationService: EvaluationService,
    private readonly userRepository: UserRepository,
    private readonly sessionResponsibleAssistenceService: SessionResponsibleAssistenceService,
    private readonly responsibleService: ResponsibleService,
    private readonly interventionProgramService: InterventionProgramService,
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
    const mappedStudents = students.map(student => ({
      ...student,
      expedient: student.expedients.filter(expedient => !expedient.finalConclusion).length
        ? student.expedients.filter(expedient => !expedient.finalConclusion)[0]
        : {},
      sessionsCounter: student.expedients.filter(expedient => !expedient.finalConclusion).length
        ? getSessionsCounter(student.expedients.filter(expedient => !expedient.finalConclusion)[0].sessions)
        : 0,
    }));
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(StudentSessions, mappedStudents, { excludeExtraneousValues: true }), pagination };
  }

  @Transactional()
  async createStudentExpedientSession(
    studentExpedientIdsDto: StudentExpedientIdsDto,
    createSessionDto: CreateSessionDto,
  ): Promise<CompleteSessionResponse> {
    const { expedientId } = studentExpedientIdsDto;
    const saveSessionValidation = this.getSessionTypeValidation(createSessionDto);
    if (!saveSessionValidation) {
      throw new UnprocessableEntityException('No se han agregado los campos minimos para guardar esta sesión');
    }
    const {
      participants,
      evaluations,
      responsibles,
      otherResponsible,
      draft,
      interventionProgramId,
      ...sessionData
    } = createSessionDto;
    const studentExpedient = await this.expedientRepository.findExpedientByStudentId(studentExpedientIdsDto);
    if (!studentExpedient) {
      throw new NotFoundException('El expediente no pertenece al estudiante especificado');
    }
    const sessionToSave: Partial<Session> = {
      ...sessionData,
      draft,
      expedient: studentExpedient,
    };
    if (!draft) {
      const identifier = await this.sessionRepository.assignSessionIdentifier(sessionData.sessionType, expedientId);
      sessionToSave.identifier = identifier;
    }
    if (participants?.length) {
      sessionToSave.counselor = await this.userRepository.findSessionParticipants(participants);
    }
    if (interventionProgramId) {
      const interventionProgram = await this.interventionProgramService.getInterventionProgramOrFail(
        interventionProgramId,
      );
      sessionToSave.interventionProgram = interventionProgram;
    }
    const session = await this.sessionRepository.save(sessionToSave);
    if (evaluations?.length) {
      const savedEvaluations = await this.evaluationService.createEvaluation(session, evaluations);
      session.evaluations = savedEvaluations;
    }
    if (responsibles?.length) {
      const savedSessionResponsibleAssistence = await this.sessionResponsibleAssistenceService.createOrUpdateSessionResponsibleAssistence(
        session,
        otherResponsible,
        responsibles,
        studentExpedientIdsDto.studentId,
      );
      session.sessionResponsibleAssistence = savedSessionResponsibleAssistence as SessionResponsibleAssistence;
    }
    await this.sessionRepository.save(session);
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

  async getSession(expedientSessionIdsDto: ExpedientSessionIdsDto): Promise<CompleteSessionResponse> {
    const { studentId } = expedientSessionIdsDto;
    const session = await this.sessionRepository.findSession(expedientSessionIdsDto);
    if (!session) {
      throw new NotFoundException('La sesión especificada no existe');
    }
    if (session.sessionResponsibleAssistence && session.sessionResponsibleAssistence.responsible1) {
      session.sessionResponsibleAssistence.responsible1 = await this.concatResponsibleRelationship(
        session.sessionResponsibleAssistence.responsible1,
        studentId,
      );
    }
    if (session.sessionResponsibleAssistence && session.sessionResponsibleAssistence.responsible2) {
      session.sessionResponsibleAssistence.responsible2 = await this.concatResponsibleRelationship(
        session.sessionResponsibleAssistence.responsible2,
        studentId,
      );
    }
    session.evaluations = session.evaluations.filter(evaluation => !evaluation.deletedAt);
    return { data: plainToClass(CompleteSession, session, { excludeExtraneousValues: true }) };
  }

  @Transactional()
  async updateSession(
    expedientSessionIdsDto: ExpedientSessionIdsDto,
    updateSessionDto: UpdateSessionDto,
  ): Promise<CompleteSessionResponse> {
    const { studentId, expedientId } = expedientSessionIdsDto;
    const session = await this.sessionRepository.findSession(expedientSessionIdsDto);
    if (!session) {
      throw new NotFoundException('La sesión especificada no existe');
    }
    if (!session.draft) {
      throw new UnprocessableEntityException('La sesión no puede modificarse, ya que no es un borrador');
    }
    const {
      participants,
      evaluations,
      responsibles,
      otherResponsible,
      draft,
      interventionProgramId,
      ...sessionData
    } = updateSessionDto;
    const sessionToSave: Partial<Session> = {
      ...session,
      ...sessionData,
    };
    if (!draft) {
      const identifier = await this.sessionRepository.assignSessionIdentifier(session.sessionType, expedientId);
      sessionToSave.identifier = identifier;
      sessionToSave.draft = false;
    }
    if (participants?.length) {
      sessionToSave.counselor = await this.userRepository.findSessionParticipants(participants);
    }
    if (evaluations) {
      const savedEvaluations = await this.evaluationService.updateSessionEvaluationsArray(session, evaluations);
      sessionToSave.evaluations = savedEvaluations;
    }
    if (responsibles?.length || otherResponsible) {
      const savedSessionResponsibleAssistence = await this.sessionResponsibleAssistenceService.createOrUpdateSessionResponsibleAssistence(
        session,
        otherResponsible,
        responsibles,
        session.expedient.student.id,
        session.sessionResponsibleAssistence.id,
      );
      sessionToSave.sessionResponsibleAssistence = savedSessionResponsibleAssistence;
    }
    if (interventionProgramId) {
      const interventionProgram = await this.interventionProgramService.getInterventionProgramOrFail(
        interventionProgramId,
      );
      sessionToSave.interventionProgram = interventionProgram;
    } else if (interventionProgramId === null) {
      sessionToSave.interventionProgram = null;
    }
    const savedSession = await this.sessionRepository.save(sessionToSave);
    if (savedSession.sessionResponsibleAssistence && savedSession.sessionResponsibleAssistence.responsible1) {
      savedSession.sessionResponsibleAssistence.responsible1 = await this.concatResponsibleRelationship(
        savedSession.sessionResponsibleAssistence.responsible1,
        studentId,
      );
    }
    if (savedSession.sessionResponsibleAssistence && savedSession.sessionResponsibleAssistence.responsible2) {
      savedSession.sessionResponsibleAssistence.responsible2 = await this.concatResponsibleRelationship(
        savedSession.sessionResponsibleAssistence.responsible2,
        studentId,
      );
    }
    savedSession.evaluations = savedSession.evaluations.filter(evaluation => !evaluation.deletedAt);
    return { data: plainToClass(CompleteSession, savedSession, { excludeExtraneousValues: true }) };
  }

  async concatResponsibleRelationship(responsible: Responsible, studentId: number): Promise<Responsible> {
    return {
      ...responsible,
      relationship:
        EResponsibleRelationship[
          await this.responsibleService.getStudentResponsibleRelationship(studentId, responsible.id)
        ],
    } as Responsible;
  }
}
