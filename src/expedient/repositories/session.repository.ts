import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Session } from '@expedient/entities/session.entity';
import { SessionsFilterDto, sortOptionsMap } from '@expedient/dtos/sessions-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';
import { PageDto } from '@core/dtos/page.dto';
import { ExpedientSessionIdsDto } from '@expedient/dtos/expedient-session-ids.dto';
import { SessionsReportFilterDto } from '@reporting/dtos/sessions-report.dto';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  findSessionsByExpedientId(
    expedientId: number,
    sessionFilterDto: SessionsFilterDto,
    pageDto: PageDto,
  ): Promise<[Session[], number]> {
    const { finishedAt, startedAt, sort, sessionType } = sessionFilterDto;
    const { page, perPage } = pageDto;
    const query = this.createQueryBuilder('session')
      .leftJoin('session.expedient', 'expedient')
      .andWhere(`"expedient"."id" = ${expedientId}`)
      .andWhere('session.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'session.id': 'DESC' });
    }

    if (sessionType) {
      query.andWhere(`session.sessionType = '${sessionType}'`);
    }

    if (startedAt) {
      query.andWhere(`session.startedAt >= '${startedAt}'`);
    }

    if (finishedAt) {
      query.andWhere(`session.startedAt <= '${finishedAt}'`);
    }

    return query.getManyAndCount();
  }

  async assignSessionIdentifier(sessionType: string, expedientId: number): Promise<number> {
    const sessions = await this.find({
      where: { sessionType, expedient: { id: expedientId } },
      order: { identifier: 'DESC' },
    });
    if (!sessions.length || !sessions[0].identifier) {
      return 1;
    }
    return sessions[0].identifier + 1;
  }

  findSession(expedientSessionIdsDto: ExpedientSessionIdsDto): Promise<Session | undefined> {
    const { expedientId, sessionId, studentId } = expedientSessionIdsDto;
    return this.findOne(sessionId, {
      where: { expedient: { id: expedientId, student: { id: studentId } }, deletedAt: null },
      relations: [
        'evaluations',
        'interventionProgram',
        'sessionResponsibleAssistence',
        'counselor',
        'sessionResponsibleAssistence.responsible1',
        'sessionResponsibleAssistence.responsible2',
        'expedient',
        'expedient.student',
        'expedient.gradeDetail',
      ],
    });
  }

  async getSessionsReport(sessionsReportDto: SessionsReportFilterDto): Promise<Session[]> {
    const {
      reportType,
      startedAt,
      finishedAt,
      shiftId,
      gradeId,
      counselorId,
      sessionType,
      serviceType,
    } = sessionsReportDto;

    const query = this.createQueryBuilder('session')
      .leftJoinAndSelect('session.expedient', 'expedient')
      .leftJoinAndSelect('expedient.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .leftJoinAndSelect('gradeDetail.counselor', 'counselor')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.cycle', 'cycle')
      .leftJoinAndSelect('cycleDetail.shift', 'shift')
      .andWhere('session.draft is false')
      .andWhere('session.deletedAt is null');

    if (shiftId) {
      query.andWhere(`shift.id = ${shiftId}`);
    }

    if (gradeId) {
      query.andWhere(`grade.id = ${gradeId}`);
    }

    if (counselorId) {
      query.andWhere(`counselor.id = ${counselorId}`);
    }

    if (sessionType) {
      query.andWhere(`session.sessionType = '${sessionType}'`);
    }

    if (serviceType) {
      query.andWhere(`session.serviceType = '${serviceType}'`);
    }

    if (startedAt) {
      query.andWhere(`session.startedAt >= '${startedAt}'`);
    }

    if (finishedAt) {
      query.andWhere(`session.startedAt <= '${finishedAt}'`);
    }

    const filteredSessions = await query.getMany();
    const sessionIds = filteredSessions.map(session => session.id);

    return getConnection().query(
      `
    SELECT sh.name AS shift, c.name AS cycle, g.name AS grade, u.firstname || ' ' || u.lastname AS counselor,
      s.${reportType} AS ${reportType}, COUNT(s.id) FROM session s
      LEFT JOIN expedient e ON s.expedient_id = e.id
      LEFT JOIN grade_detail gd ON e.grade_detail_id = gd.id
      LEFT JOIN grade g ON gd.grade_id = g.id
      LEFT JOIN cycle_detail cd ON gd.cycle_detail_id = cd.id
      LEFT JOIN cycle c ON cd.cycle_id = c.id
      LEFT JOIN shift sh ON cd.shift_id = sh.id
      LEFT JOIN "user" u ON gd.counselor_id = u.id
      WHERE s.id = ANY($1)
      GROUP BY shift, cycle, grade, counselor, ${reportType}
    `,
      [[null, ...sessionIds]],
    );
  }

  findSessionsInterventionPrograms(expedientId: number): Promise<Session[]> {
    const query = this.createQueryBuilder('session')
      .leftJoin('session.expedient', 'expedient')
      .leftJoinAndSelect('session.interventionProgram', 'interventionProgram')
      .distinctOn(['interventionProgram.id'])
      .andWhere('session.deletedAt is null')
      .andWhere(`"expedient"."id" = ${expedientId}`);

    return query.getMany();
  }
}
