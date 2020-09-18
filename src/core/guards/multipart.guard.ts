import { CanActivate, ExecutionContext, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';

@Injectable()
export class MultipartGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const contentType = context.switchToHttp().getRequest().headers['content-type'];

    if (!contentType || !contentType.includes('multipart/form-data')) {
      throw new UnsupportedMediaTypeException('Request media type must be multipart/form-data');
    }

    return true;
  }
}
