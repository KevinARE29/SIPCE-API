import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccessLogRepository } from '@logs/repositories/access-log.repository';
import { logAccess } from '@logs/utils/log.util';

@Injectable()
export class AccessLogInterceptor implements NestInterceptor {
  constructor(private readonly accessLogRepository: AccessLogRepository) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        logAccess(context.switchToHttp(), this.accessLogRepository);
      }),
    );
  }
}
