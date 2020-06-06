import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AccessLogRepository } from '@logs/repositories/access-log.repository';
import { logAccess } from '@logs/utils/log.util';
import { IExceptionResponse } from '../interfaces/exception-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly accessLogRepository: AccessLogRepository) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();

    let statusCode: number;
    let error: string;
    let message: string | string[] | ValidationError[] | undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as IExceptionResponse;
      statusCode = exception.getStatus();
      error = exceptionResponse.error;
      message = exceptionResponse.message;
    } else if (exception instanceof QueryFailedError) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      error = 'Unprocessable Entity';
      message = exception.message;
    } else {
      // eslint-disable-next-line no-console
      console.error(exception);
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      error = 'Internal Server Error';
    }

    if (context.getRequest().url === '/api/v1/auth/login') {
      logAccess(context, this.accessLogRepository, statusCode);
    }

    response.status(statusCode).json({ statusCode, error, message });
  }
}
