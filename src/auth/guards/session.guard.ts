import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Token } from '../entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const req = ctx.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const accessToken = authHeader.split(' ')[1];
      const token = await this.tokenRepository.findOne({ where: { accessToken } });
      if (!token) {
        throw Error;
      }
      const accessTokenSecret = this.configService.get<string>('JWT_SECRET_ACCESS_TOKEN') || 'access';
      verify(accessToken, accessTokenSecret);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }
}
