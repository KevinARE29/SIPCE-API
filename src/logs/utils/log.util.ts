import { AccessLogRepository } from '@logs/repositories/access-log.repository';
import { Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

export async function logAccess(
  context: HttpArgumentsHost,
  accessLogRepository: AccessLogRepository,
  code?: number,
): Promise<void> {
  const req = context.getRequest();
  const statusCode = code || context.getResponse().statusCode;
  const { username } = req.body;
  const ip = req.headers['x-forwarded-for'];
  try {
    await accessLogRepository.save({ username, ip, statusCode });
  } catch {
    Logger.log('Error while creating the access log');
  }
}
