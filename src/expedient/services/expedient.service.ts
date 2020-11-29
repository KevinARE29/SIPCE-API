import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ExpedientRepository } from '@expedient/repositories/expedient.repository';
import { StudentExpedientIdsDto } from '@expedient/dtos/student-expedient-ids.dto';
import { SessionRepository } from '@expedient/repositories/session.repository';
import { SessionsFilterDto } from '@expedient/dtos/sessions-filter.dto';
import { ExpedientSessionsResponse } from '@expedient/docs/expedient-sessions-response.doc';
import { plainToClass } from 'class-transformer';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { Session } from '@expedient/docs/session.doc';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import {
  getSessionsTypeCounter,
  getExpedientInterventionPrograms,
  getExpedientEvaluations,
} from '@expedient/utils/session.util';
import { CompleteExpedient } from '@expedient/docs/complete-expedient.doc';
import { initialStudentExpedient } from '@expedient/constants/expedient.constants';
import { StudentExpedientsResponse } from '@expedient/docs/student-expedients-response.doc';
import { CreateExpedientDto } from '@expedient/dtos/create-expedient.dto';
import { StudentRepository } from '@students/repositories';
import { StudentExpedientResponse } from '@expedient/docs/student-expedient-response.doc';
import { UpdateExpedientDto } from '@expedient/dtos/update-expedient.dto';

@Injectable()
export class ExpedientService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly expedientRepository: ExpedientRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async findExpedientSessions(
    studentExpedientIdsDto: StudentExpedientIdsDto,
    pageDto: PageDto,
    sessionFilterDto: SessionsFilterDto,
  ): Promise<ExpedientSessionsResponse> {
    const expedient = await this.expedientRepository.findExpedientByStudentId(studentExpedientIdsDto);
    if (!expedient) {
      throw new NotFoundException('El expediente no pertenece al estudiante especificado');
    }
    const [sessions, count] = await this.sessionRepository.findSessionsByExpedientId(
      expedient.id,
      sessionFilterDto,
      pageDto,
    );
    const pagination = getPagination(pageDto, count);
    const data = plainToClass(Session, sessions, { excludeExtraneousValues: true });
    return { data, pagination };
  }

  async findStudentExpedients(studentIdDto: StudentIdDto): Promise<StudentExpedientsResponse> {
    const { studentId } = studentIdDto;
    const studentExpedients = await this.expedientRepository.findStudentExpedients(studentId);
    const expedientsToReturn = await Promise.all(
      studentExpedients.map(async expedient => ({
        ...expedient,
        sessionsCounter: getSessionsTypeCounter(expedient.sessions.filter(session => !session.deletedAt)),
        activeInterventionPrograms: getExpedientInterventionPrograms(
          await this.sessionRepository.findSessionsInterventionPrograms(expedient.id),
        ),
        evaluations: getExpedientEvaluations(expedient.sessions.filter(session => !session.deletedAt)),
        expedientGrade: `${expedient.gradeDetail.grade.name} (${expedient.gradeDetail.cycleDetail.schoolYear.year})`,
      })),
    );
    const currentYear = new Date().getFullYear();
    const initialExpedient: any = initialStudentExpedient;
    if (expedientsToReturn[0]) {
      if (
        expedientsToReturn[0].gradeDetail.cycleDetail.schoolYear.year !== currentYear ||
        (expedientsToReturn[0].finalConclusion &&
          expedientsToReturn[0].gradeDetail.grade.id !== expedientsToReturn[0].student.currentGrade.id)
      ) {
        expedientsToReturn.unshift(initialExpedient);
      }
    } else {
      return { data: plainToClass(CompleteExpedient, [initialExpedient], { excludeExtraneousValues: true }) };
    }
    return { data: plainToClass(CompleteExpedient, expedientsToReturn, { excludeExtraneousValues: true }) };
  }

  async openStudentExpedient(
    studentIdDto: StudentIdDto,
    createExpedientDto: CreateExpedientDto,
  ): Promise<StudentExpedientResponse> {
    const { studentId } = studentIdDto;
    const student = await this.studentRepository.getStudentCurrentAssignation(studentId);
    if (!student) {
      throw new NotFoundException('El estudiante especificado no fue encontrado');
    }
    const studentExpedients = await this.expedientRepository.findStudentExpedients(studentId);
    if (studentExpedients.length && !studentExpedients[0].finalConclusion) {
      throw new UnprocessableEntityException('No puede aperturar un expediente hasta cerrar el anterior');
    }
    const studentGradeDetail = student.sectionDetails[0].gradeDetail;
    const expedientToSave = {
      ...createExpedientDto,
      student,
      gradeDetail: studentGradeDetail,
    };
    const savedExpedient = await this.expedientRepository.save(expedientToSave);
    const expedient = {
      ...savedExpedient,
      sessionsCounter: {
        individualSessionCounter: 0,
        parentsInterviewCounter: 0,
        teachersInterviewCounter: 0,
      },
      activeInterventionPrograms: [],
      evaluations: [],
      expedientGrade: `${savedExpedient.gradeDetail.grade.name} (${savedExpedient.gradeDetail.cycleDetail.schoolYear.year})`,
    };
    return { data: plainToClass(CompleteExpedient, expedient, { excludeExtraneousValues: true }) };
  }

  async updateStudentExpedient(
    studentExpedientIdsDto: StudentExpedientIdsDto,
    updateExpedientDto: UpdateExpedientDto,
  ): Promise<StudentExpedientResponse> {
    const expedient = await this.expedientRepository.findStudentExpedientById(studentExpedientIdsDto);
    if (!expedient) {
      throw new NotFoundException('El expediente no pertenece al estudiante especificado');
    }
    const expedientToSave = {
      ...expedient,
      ...updateExpedientDto,
    };
    const savedExpedient = await this.expedientRepository.save(expedientToSave);
    const expedientToReturn = {
      ...savedExpedient,
      sessionsCounter: getSessionsTypeCounter(expedient.sessions.filter(session => !session.deletedAt)),
      activeInterventionPrograms: getExpedientInterventionPrograms(
        await this.sessionRepository.findSessionsInterventionPrograms(expedient.id),
      ),
      evaluations: getExpedientEvaluations(expedient.sessions.filter(session => !session.deletedAt)),
      expedientGrade: `${expedient.gradeDetail.grade.name} (${expedient.gradeDetail.cycleDetail.schoolYear.year})`,
    };
    return { data: plainToClass(CompleteExpedient, expedientToReturn, { excludeExtraneousValues: true }) };
  }
}
