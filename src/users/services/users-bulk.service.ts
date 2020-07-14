/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { BulkUserDto } from '@users/dtos/bulk/bulk-user.dto';
import { UserRepository } from '@users/repositories/users.repository';
import { RoleRepository } from '@auth/repositories/role.repository';
import { bulkCatchMessage } from '@users/utils/bulk-catch-message.util';

@Injectable()
export class UsersBulkService {
  constructor(private readonly userRepository: UserRepository, private readonly roleRepository: RoleRepository) {}

  async bulkUsers(users: BulkUserDto[]): Promise<void> {
    const message: { [key: number]: string } = {};
    for (const [index, user] of users.entries()) {
      const { roleIds, code } = user;
      const [roles, existingUser] = await Promise.all([
        roleIds ? this.roleRepository.findRoles(roleIds) : [],
        this.userRepository.findOne({ relations: ['roles'], where: { code } }),
      ]);
      try {
        if (existingUser) {
          await this.userRepository.save({ ...existingUser, ...user, roles: roleIds ? roles : existingUser.roles });
        } else {
          await this.userRepository.save({ ...user, roles });
        }
      } catch (err) {
        Logger.error(err);
        message[index] = bulkCatchMessage(err);
      }
    }
    if (Object.keys(message).length) {
      throw new ConflictException({ error: 'Conflict', message });
    }
  }
}
