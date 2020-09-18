import { ValidationError } from '@nestjs/common';

export interface IExceptionResponse {
  error: string;
  message: string | ValidationError[];
}

export interface ITypeOrmQueryFailed {
  routine: string;
  detail: string;
}
