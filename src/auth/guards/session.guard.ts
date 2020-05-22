import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(' ')[1];
    const token = await this.tokenRepository.findOne({ where: { accessToken } });
    if (!token) {
      throw new UnauthorizedException('Token no encontrado en la Base de Datos');
    }
    return true;
  }
}
