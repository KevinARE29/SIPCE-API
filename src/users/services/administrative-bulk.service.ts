/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Injectable, ConflictException } from '@nestjs/common';
import { AdministrativeDto } from '@users/dtos/bulk/administrative.dto';
import { UserRepository } from '@users/repositories/users.repository';
import { RoleRepository } from '@auth/repositories/role.repository';
import { QueryFailedError } from 'typeorm';
import { ITypeOrmQueryFailed } from '@core/interfaces/exception-response.interface';
import { snakeToCamel, getEntityMap } from '@core/utils/core.util';

@Injectable()
export class AdministrativeBulkService {
  constructor(private readonly userRepository: UserRepository, private readonly roleRepository: RoleRepository) {}

  async bulkAdministratives(administratives: AdministrativeDto[]): Promise<void> {
    const roles = await this.roleRepository.getRoleNames();
    const roleMap = getEntityMap('name', roles);
    const message: { [key: number]: string } = {};
    for (const [index, user] of administratives.entries()) {
      try {
        const role = roleMap.get(user.role.toLowerCase());
        if (!role) {
          message[index] = `role: El rol '${user.role}' no existe`;
          continue;
        }
        const existingUser = await this.userRepository.findOne({
          relations: ['roles'],
          where: {
            code: user.code,
          },
        });
        if (existingUser) {
          await this.userRepository.save({ ...existingUser, ...user, roles: [...existingUser.roles, role] });
        } else {
          await this.userRepository.save({ ...user, roles: [role] });
        }
      } catch (err) {
        let msg = 'all: No se pudo insertar el registro';
        if (err instanceof QueryFailedError) {
          // Mapping the TypeORM exception
          const { detail, routine } = (err as unknown) as ITypeOrmQueryFailed;
          if (routine === '_bt_check_unique') {
            // This happens when there is an unique constraint exception
            const property = detail.match(/Key [(](?<key>[a-z_]+)[)]/)?.groups?.key as string;
            msg = `${snakeToCamel(property)}: Ya existe un registro con ese valor`;
          }
        }
        message[index] = msg;
      }
    }
    if (Object.keys(message).length) {
      throw new ConflictException({ error: 'Conflict', message });
    }
  }
}
