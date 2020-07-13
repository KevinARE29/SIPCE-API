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
    Logger.error(exception);
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
      // Mapping the TypeORM exception
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      error = 'Unprocessable Entity';
      const { detail, routine } = (exception as unknown) as ITypeOrmQueryFailed;
      if (routine === '_bt_check_unique') {
        // This happens when a unique constraint in the DB fails
        const groups = detail.match(/Key [(](?<key>[A-Za-z0-9_, ]+)[)]=[(](?<value>[A-Za-z0-9\-_,@. ]+)/)?.groups;
        const key = groups && groups.key;
        const value = groups && groups.value;
        if (key && value) {
          message = `${snakeToCamel(key)}: Ya existe un registro con el valor ${value}`;
        }
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

    response.status(statusCode).json({ statusCode, error, message });
  }
}
