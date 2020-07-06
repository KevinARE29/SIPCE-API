/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { UserRepository } from '@users/repositories/users.repository';
import { RoleRepository } from '@auth/repositories/role.repository';
import { IsNull, Connection } from 'typeorm';
import { getEntityMap } from '@core/utils/core.util';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { CycleDetailRepository } from '@academics/repositories/cycle-detail.repository';
import { CycleRepository } from '@academics/repositories/cycle.repository';
import { bulkCatchMessage } from '@users/utils/bulk-catch-message.util';
import { BulkTeacherDto } from '@users/dtos/bulk/bulk-teacher.dto';
import { GradeDetailRepository } from '@academics/repositories/grade-detail.repository';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { SectionDetailRepository } from '@academics/repositories/section-detail.repository';
import { SectionRepository } from '@academics/repositories/section.repository';
import { parseTeachers, parseBulkErrors } from '@users/utils/bulk-teacher.util';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';

@Injectable()
export class TeacherBulkService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly cycleDetailRepository: CycleDetailRepository,
    private readonly cycleRepository: CycleRepository,
    private readonly gradeDetailRepository: GradeDetailRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
    private readonly sectionRepository: SectionRepository,
    private readonly roleRepository: RoleRepository,
    private connection: Connection,
  ) {}

  async bulkTeacher(bulkTeacherDto: BulkTeacherDto): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    const { currentYear, shiftId, teachers } = bulkTeacherDto;

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

    const [gradeDetails, grades] = await Promise.all([
      this.gradeDetailRepository.findGradeDetails(cycleDetails.map(detail => detail.id)),
      this.gradeRepository.find({ where: { active: true } }),
    ]);
    const gradeDetailsMap = getEntityMap('grade', gradeDetails);
    const gradesMap = getEntityMap('id', grades);
    const [sectionDetails, sections] = await Promise.all([
      this.sectionDetailRepository.findSectionDetails(gradeDetails.map(detail => detail.id)),
      this.sectionRepository.find({ where: { deletedAt: IsNull() } }),
    ]);
    const sectionsMap = getEntityMap('id', sections);

    const parsedTeachers = parseTeachers(teachers);
    const message: { [key: number]: string } = {};

    for (const cycleId of Object.keys(parsedTeachers)) {
      const cycle = cyclesMap.get(+cycleId);
      if (!cycle) {
        Object.assign(message, parseBulkErrors(teachers, +cycleId, 'cycle'));
        continue;
      }
      let cycleDetail: CycleDetail;
      try {
        cycleDetail = cycleDetailsMap.get(+cycleId) || (await this.cycleDetailRepository.save({ shift, year, cycle }));
      } catch {
        const index = teachers.findIndex(teacher => teacher.cycleId === +cycleId);
        Object.assign(message, { [index]: 'all: No se pudo insertar el registro' });
        continue;
      }

      for (const gradeId of Object.keys(parsedTeachers[cycleId])) {
        const grade = gradesMap.get(+gradeId);
        if (!grade) {
          Object.assign(message, parseBulkErrors(teachers, +gradeId, 'grade'));
          continue;
        }
        let gradeDetail: GradeDetail;
        try {
          const existingGradeDetail = gradeDetailsMap.get(+gradeId);
          gradeDetail = existingGradeDetail
            ? await this.gradeDetailRepository.save({ ...existingGradeDetail, grade, cycleDetail })
            : await this.gradeDetailRepository.save({ grade, cycleDetail });
        } catch {
          const index = teachers.findIndex(teacher => teacher.cycleId === +cycleId && teacher.gradeId === +gradeId);
          Object.assign(message, { [index]: 'all: No se pudo insertar el registro' });
          continue;
        }

        for (const sectionId of Object.keys(parsedTeachers[cycleId][gradeId])) {
          const section = sectionsMap.get(+sectionId);
          if (!section) {
            Object.assign(message, parseBulkErrors(teachers, +sectionId, 'section'));
            continue;
          }
          const user = parsedTeachers[cycleId][gradeId][sectionId];
          try {
            const [existingUser, teacherRole] = await Promise.all([
              this.userRepository.findByCode(user.code),
              this.roleRepository.getRoleByName('docente'),
            ]);

            if (!teacherRole) {
              throw new Error();
            }

            const existingSectionDetail = sectionDetails.find(
              detail => detail.section.id === +sectionId && detail.gradeDetail.id === gradeDetail.id,
            );
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const teacher = existingUser
              ? await this.userRepository.save({
                  ...existingUser,
                  ...user,
                  roles: [...existingUser.roles, teacherRole],
                })
              : await this.userRepository.save({ ...user, roles: [teacherRole] });
            if (existingSectionDetail) {
              await this.sectionDetailRepository.save({ ...existingSectionDetail, section, gradeDetail, teacher });
            } else {
              await this.sectionDetailRepository.save({ section, gradeDetail, teacher });
            }
            await queryRunner.commitTransaction();
          } catch (err) {
            await queryRunner.rollbackTransaction();
            const index = teachers.findIndex(
              teacher =>
                teacher.cycleId === +cycleId && teacher.gradeId === +gradeId && teacher.sectionId === +sectionId,
            );
            Object.assign(message, { [index]: bulkCatchMessage(err) });
            continue;
          }
        }
      }
    }
    await queryRunner.release();
    if (Object.keys(message).length) {
      throw new ConflictException({ error: 'Conflict', message });
    }
  }
}
