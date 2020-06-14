import { Injectable, Logger } from '@nestjs/common';
import { AccessLogsResponse } from '@logs/docs/access-logs-response.doc';
import { AccessLogRepository } from '@logs/repositories/access-log.repository';
import { PageDto } from '@core/dtos/page.dto';
import { AccessLogFilterDto } from '@logs/dtos/access-log-filter.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { AccessLogs } from '@logs/docs/access-logs.doc';
import { ActionLogRepository } from '@logs/repositories/action-log.repository';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { excludedUrls, EMethods, TMethods, EActions } from '@logs/constants/log.constant';

@Injectable()
export class LogService {
  constructor(
    private readonly accessLogRepository: AccessLogRepository,
    private readonly actionLogRepository: ActionLogRepository,
    private readonly configService: ConfigService,
  ) {}

  async logAccess(context: HttpArgumentsHost, code?: number): Promise<void> {
    const apiPrefix = this.configService.get('API_PREFIX') || 'api/v1';
    const {
      url,
      headers,
      body: { username },
    } = context.getRequest();

    if (url !== `/${apiPrefix}/auth/login`) {
      return;
    }

    const statusCode = code || context.getResponse().statusCode;
    const ip = headers['x-forwarded-for']?.split(',')[0];
    try {
      await this.accessLogRepository.save({ username, ip, statusCode });
    } catch {
      Logger.log('Error while creating the access log');
    }
  }

  async logAction(context: HttpArgumentsHost, code?: number): Promise<void> {
    const { method, user, url } = context.getRequest();
    const apiPrefix = this.configService.get('API_PREFIX') || 'api/v1';

    if (excludedUrls.includes(url.split(`${apiPrefix}/`)[1])) {
      return;
    }

    const statusCode = code || context.getResponse().statusCode;
    try {
      const action = (EMethods[method as TMethods] as unknown) as EActions;
      await this.actionLogRepository.save({ endpoint: url, action, statusCode, user: user.id });
    } catch {
      Logger.log('Error while creating the action log');
    }
  }

  async getAccessLogs(pageDto: PageDto, accessLogFilterDto: AccessLogFilterDto): Promise<AccessLogsResponse> {
    const [accessLogs, count] = await this.accessLogRepository.getAllAccessLogs(pageDto, accessLogFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(AccessLogs, accessLogs, { excludeExtraneousValues: true }), pagination };
  }
}
