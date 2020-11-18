import { Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@expedient/entities/session.entity';
import { OtherResponsiblesAssistenceDto } from '@expedient/dtos/other-responsible-assistence.dto';
import { ResponsiblesAssistenceDto } from '@expedient/dtos/responsibles-assistence.dto';
import { SessionResponsibleAssistence } from '@expedient/entities/session-responsible-assistence.entity';
import { ResponsibleRepository } from '@students/repositories';
import { SessionResponsibleAssistenceRepository } from '@expedient/repositories/session-responsible-assistence.repository';

@Injectable()
export class SessionResponsibleAssistenceService {
  constructor(
    private readonly responsibleRepository: ResponsibleRepository,
    private readonly sessionResponsibleAssistenceRepository: SessionResponsibleAssistenceRepository,
  ) {}

  async createOrUpdateSessionResponsibleAssistence(
    session: Session,
    otherResponsible: OtherResponsiblesAssistenceDto | undefined,
    responsibles: ResponsiblesAssistenceDto[],
    studentId: number,
    sessionResponsibleAsistenceId?: number,
  ): Promise<SessionResponsibleAssistence> {
    const responsiblesIds = responsibles.map(responsible => responsible.id);
    const studentResponsibles = await this.responsibleRepository.findStudentResponsiblesById(
      responsiblesIds,
      studentId,
    );
    if (!studentResponsibles) {
      throw new NotFoundException('Los responsables enviados no corresponden al estudiante');
    }
    const responsible1 = studentResponsibles[0];
    const responsible1Assistence = responsibles.find(responsible => responsible.id === responsible1.id)?.attended;
    const sessionResponsibleAsistence: Partial<SessionResponsibleAssistence> = {
      ...otherResponsible,
      session,
      responsible1,
      responsible1Assistence,
    };
    if (sessionResponsibleAsistenceId) {
      sessionResponsibleAsistence.id = sessionResponsibleAsistenceId;
    }
    if (studentResponsibles.length > 1) {
      const responsible2 = studentResponsibles[1];
      const responsible2Assistence = responsibles.find(responsible => responsible.id === responsible2.id)?.attended;
      sessionResponsibleAsistence.responsible2 = responsible2;
      sessionResponsibleAsistence.responsible2Assistence = responsible2Assistence;
    }
    return this.sessionResponsibleAssistenceRepository.save(sessionResponsibleAsistence);
  }
}
