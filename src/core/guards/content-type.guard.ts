import { CanActivate, ExecutionContext, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ContentTypeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (request.headers['content-type'] !== 'application/json') {
      throw new UnsupportedMediaTypeException('El tipo de contenido debe ser application/json');
    }

    return true;
  }
}
