import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageValidatorInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { file } = request;
    const whiteList = this.configService.get<string>('FILE_EXTENSION_WHITE_LIST');
    if (!whiteList) {
      throw new UnprocessableEntityException('File whitelist is not defined');
    }
    const allowedExtensions = whiteList.toLowerCase().split(',');
    const fileExtension = file.originalname.toLowerCase().split('.')[1];
    if (!allowedExtensions.includes(fileExtension)) {
      throw new UnsupportedMediaTypeException('File type is not allowed');
    }
    const allowedSize = this.configService.get<number>('FILE_SIZE_LIMIT_IN_BYTES') || 5242880;
    if (allowedSize < Number(file.size)) {
      throw new UnsupportedMediaTypeException('File size is not allowed');
    }

    return next.handle();
  }
}
