import { createParamDecorator, UnauthorizedException, ExecutionContext } from '@nestjs/common';

export const BearerToken = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedException('Token no encontrado en los headers');
  }
  const bearerToken = authHeader.split(' ')[1];
  return bearerToken;
});
