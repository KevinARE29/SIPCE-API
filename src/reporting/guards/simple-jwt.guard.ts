import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class SimpleJwt implements CanActivate {
  private readonly jwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtSecret = configService.get('JWT_SECRET_REPORT', '');
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const req = context.switchToHttp().getRequest();
      const { token } = req.query;
      if (!token) {
        return false;
      }
      verify(token, this.jwtSecret);

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
