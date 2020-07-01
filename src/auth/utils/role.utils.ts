import { Role } from '@auth/entities/role.entity';

export function isInReadOnlyRoles(roleId: number): boolean {
  return roleId <= 5;
}

export function getRoleMap(roles: Role[]): Map<string, Role> {
  return roles.reduce((acum, role) => {
    return acum.set(role.name, role);
  }, new Map());
}
