import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpedientRepository } from '@expedient/repositories/expedient.repository';
import { StudentExpedientIdsDto } from '@expedient/dtos/student-expedient-ids.dto';
import { SessionRepository } from '@expedient/repositories/session.repository';
import { SessionsFilterDto } from '@expedient/dtos/sessions-filter.dto';
import { ExpedientSessionsResponse } from '@expedient/docs/expedient-sessions-response.doc';
import { plainToClass } from 'class-transformer';
import { ExpedientSessions } from '@expedient/docs/expedient-sessions.doc';

@Injectable()
export class ExpedientService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly expedientRepository: ExpedientRepository,
  ) {}

  async findExpedientByStudentId(
    studentExpedientIdsDto: StudentExpedientIdsDto,
    sessionFilterDto: SessionsFilterDto,
  ): Promise<ExpedientSessionsResponse> {
    const expedient = await this.expedientRepository.findExpedientByStudentId(studentExpedientIdsDto);
    if (!expedient) {
      throw new NotFoundException('El expediente no pertenece al estudiante especificado');
    }
    const sessions = await this.sessionRepository.findSessionsByExpedientId(expedient.id, sessionFilterDto);
    const data = plainToClass(ExpedientSessions, { ...expedient, sessions }, { excludeExtraneousValues: true });
    return { data };
  }
}
