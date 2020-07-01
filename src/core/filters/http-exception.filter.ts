import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ValidationError,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { LogService } from '@logs/services/log.service';
import { snakeToCamel } from '@core/utils/core.util';
import { IExceptionResponse, ITypeOrmQueryFailed } from '../interfaces/exception-response.interface';

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
      const { detail, routine } = (exception as unknown) as ITypeOrmQueryFailed;
      if (routine === '_bt_check_unique') {
        const property = detail.match(/Key [(](?<key>[a-z_]+)[)]/)?.groups?.key as string;
        message = `${snakeToCamel(property)}: Ya existe un registro con ese valor`;
      } else {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        error = 'Internal Server Error';
      }
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      error = 'Internal Server Error';
    }

    this.logService.logAccess(context, statusCode);
    this.logService.logAction(context, statusCode);

    Logger.error(message);
    response.status(statusCode).json({ statusCode, error, message });
  }
}
