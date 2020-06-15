import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '@auth/guards/session.guard';
import { PermissionGuard } from '@auth/guards/permission.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard),
    ApiBearerAuth(),
  );
}
