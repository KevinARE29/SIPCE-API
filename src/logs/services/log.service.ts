import { Injectable } from '@nestjs/common';
import { AccessLogsResponse } from '@logs/docs/access-logs-response.doc';
import { AccessLogRepository } from '@logs/repositories/access-log.repository';
import { PageDto } from '@core/dtos/page.dto';
import { AccessLogFilterDto } from '@logs/dtos/access-log-filter.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { AccessLogs } from '@logs/docs/access-logs.doc';

@Injectable()
export class LogService {
  constructor(private readonly accessLogRepository: AccessLogRepository) {}

  async getAccessLogs(pageDto: PageDto, accessLogFilterDto: AccessLogFilterDto): Promise<AccessLogsResponse> {
    const [accessLogs, count] = await this.accessLogRepository.getAllAccessLogs(pageDto, accessLogFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(AccessLogs, accessLogs, { excludeExtraneousValues: true }), pagination };
  }
}
