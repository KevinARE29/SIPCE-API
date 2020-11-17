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
}
