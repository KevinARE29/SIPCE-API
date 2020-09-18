/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Injectable, ConflictException, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from '@users/repositories/users.repository';
import { RoleRepository } from '@auth/repositories/role.repository';
import { Connection } from 'typeorm';
import { getEntityMap } from '@core/utils/core.util';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { CycleDetailRepository } from '@academics/repositories/cycle-detail.repository';
import { bulkCatchMessage } from '@users/utils/bulk-catch-message.util';
import { BulkCounselorDto } from '@users/dtos/bulk/bulk-counselor.dto';
import { GradeDetailRepository } from '@academics/repositories/grade-detail.repository';
import { GradeRepository } from '@academics/repositories/grade.repository';

@Injectable()
export class CounselorBulkService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly cycleDetailRepository: CycleDetailRepository,
    private readonly gradeDetailRepository: GradeDetailRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly roleRepository: RoleRepository,
    private connection: Connection,
  ) {}

  async bulkCounselor(bulkCounselorDto: BulkCounselorDto): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    const { currentYear, shiftId, counselors } = bulkCounselorDto;

    const shift = await this.shiftRepository.findById(shiftId);
    if (!shift) {
      throw new BadRequestException('shiftId: El turno seleccionado no existe o no está activo');
    }
    const now = new Date().getFullYear();
    const year = currentYear ? now : now + 1;

    const [cycleDetails] = await Promise.all([this.cycleDetailRepository.findCycleDetails(shiftId, year)]);

    const [gradeDetails, grades] = await Promise.all([
      this.gradeDetailRepository.findGradeDetails(cycleDetails.map(detail => detail.id)),
      this.gradeRepository.find({ where: { active: true } }),
    ]);
    const gradeDetailsMap = getEntityMap('grade', gradeDetails);
    const gradesMap = getEntityMap('id', grades);

    const message: { [key: number]: string } = {};
    for (const [index, user] of counselors.entries()) {
      const [existingUser, counselorRole] = await Promise.all([
        this.userRepository.findOne({
          relations: ['roles'],
          where: {
            code: user.code,
          },
        }),
        this.roleRepository.getRoleByName('orientador'),
      ]);

      if (!counselorRole) {
        throw new UnprocessableEntityException('El orientador no existe');
      }

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const counselor = existingUser
          ? await this.userRepository.save({
              ...existingUser,
              ...user,
              roles: [...existingUser.roles, counselorRole],
            })
          : await this.userRepository.save({ ...user, roles: [counselorRole] });

        for (const gradeId of user.grades) {
          const grade = gradesMap.get(gradeId);
          if (!grade) {
            message[index] = 'grades: Contiene grados inactivos o no válidos';
            continue;
          }
          const gradeDetail = gradeDetailsMap.get(gradeId);
          if (!gradeDetail) {
            message[index] =
              'grades: No hay carga de grados para el año seleccionado, ' +
              'consulte con el administrador del sistema e inténtelo de nuevo';
            continue;
          }
          await this.gradeDetailRepository.save({ ...gradeDetail, counselor });
        }

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        message[index] = bulkCatchMessage(err);
      }
    }
    await queryRunner.release();
    if (Object.keys(message).length) {
      throw new ConflictException({ error: 'Conflict', message });
    }
  }
}
