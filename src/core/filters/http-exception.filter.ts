import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { LogService } from '@logs/services/log.service';
import { IExceptionResponse } from '../interfaces/exception-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logService: LogService) {}

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

    this.logService.logAccess(context, statusCode);
    this.logService.logAction(context, statusCode);

    response.status(statusCode).json({ statusCode, error, message });
  }
}
