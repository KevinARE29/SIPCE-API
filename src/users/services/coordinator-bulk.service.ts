/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Injectable, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { UserRepository } from '@users/repositories/users.repository';
import { RoleRepository } from '@auth/repositories/role.repository';
import { IsNull } from 'typeorm';
import { getEntityMap } from '@core/utils/core.util';
import { BulkCoordinatorDto } from '@users/dtos/bulk/bulk-coordinator.dto';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { CycleDetailRepository } from '@academics/repositories/cycle-detail.repository';
import { CycleRepository } from '@academics/repositories/cycle.repository';
import { bulkCatchMessage } from '@users/utils/bulk-catch-message.util';

@Injectable()
export class CoordinatorBulkService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly cycleDetailRepository: CycleDetailRepository,
    private readonly cycleRepository: CycleRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async bulkCoordinator(bulkCoordinatorDto: BulkCoordinatorDto): Promise<void> {
    const { currentYear, shiftId, coordinators } = bulkCoordinatorDto;
    const shift = await this.shiftRepository.findById(shiftId);
    if (!shift) {
      throw new BadRequestException('shiftId: El turno seleccionado no existe o no está activo');
    }
    const now = new Date().getFullYear();
    const year = currentYear ? now : now + 1;
    const [cycleDetails, cycles] = await Promise.all([
      this.cycleDetailRepository.findCycleDetails(shiftId, year),
      this.cycleRepository.find({ where: { deletedAt: IsNull() } }),
    ]);
    const cycleDetailsMap = getEntityMap('cycle', cycleDetails);
    const cyclesMap = getEntityMap('id', cycles);
    const message: { [key: number]: string } = {};
    for (const [index, user] of coordinators.entries()) {
      try {
        const cycle = cyclesMap.get(user.cycleId);
        if (!cycle) {
          message[index] = `cycleId: El ciclo '${user.cycleId}' no existe`;
          continue;
        }

        const [existingUser, coordinatorRole] = await Promise.all([
          this.userRepository.findOne({
            relations: ['roles'],
            where: {
              code: user.code,
            },
          }),
          this.roleRepository.getRoleByName('coordinador'),
        ]);

        if (!coordinatorRole) {
          throw new Error();
        }

        const cycleCoordinator = existingUser
          ? await this.userRepository.save({
              ...existingUser,
              ...user,
              roles: [...existingUser.roles, coordinatorRole],
            })
          : await this.userRepository.save({ ...user, roles: [coordinatorRole] });

        const existingCycleDetail = cycleDetailsMap.get(user.cycleId);
        if (existingCycleDetail) {
          await this.cycleDetailRepository.save({ ...existingCycleDetail, cycleCoordinator });
        } else {
          await this.cycleDetailRepository.save({ shift, year, cycleCoordinator, cycle });
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
