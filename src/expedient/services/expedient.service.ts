import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class ExpedientService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly expedientRepository: ExpedientRepository,
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
}
