import { EntityRepository, Repository } from 'typeorm';
import { SchoolYear } from '@academics/entities/school-year.entity';
import { activeSchoolYearStatus, ESchoolYearStatus } from '@academics/constants/academic.constants';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { SectionDetail } from '@academics/entities/section-detail.entity';
import { CurrentAssignationDto } from '@academics/dtos/school-year/current-assignation.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(SchoolYear)
export class SchoolYearRepository extends Repository<SchoolYear> {
  getCurrentAssignation(currentAssignationDto: CurrentAssignationDto): Promise<SchoolYear | undefined> {
    const { shiftId, cycleId, gradeId, sectionId, teacherId, status } = currentAssignationDto;
    const query = this.createQueryBuilder('schoolYear')
      .leftJoinAndMapMany(
        'schoolYear.cycleDetails',
        CycleDetail,
        'cycleDetail',
        'cycleDetail.schoolYear = schoolYear.id',
      )
      .leftJoinAndSelect('cycleDetail.shift', 'shift')
      .leftJoinAndSelect('cycleDetail.cycle', 'cycle')
      .leftJoinAndSelect('cycleDetail.cycleCoordinator', 'cycleCoordinator')
      .leftJoinAndMapMany(
        'cycleDetail.gradeDetails',
        GradeDetail,
        'gradeDetail',
        'gradeDetail.cycleDetail = cycleDetail.id',
      )
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .leftJoinAndSelect('gradeDetail.counselor', 'counselor')
      .leftJoinAndMapMany(
        'gradeDetail.sectionDetails',
        SectionDetail,
        'sectionDetail',
        'sectionDetail.gradeDetail = gradeDetail.id',
      )
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .leftJoinAndSelect('sectionDetail.teacher', 'teacher');

    if (shiftId) {
      query.andWhere(`"shift"."id" = ${shiftId}`);
    }
    if (cycleId) {
      query.andWhere(`"cycle"."id" = ${cycleId}`);
    }
    if (gradeId) {
      query.andWhere(`"grade"."id" = ${gradeId}`);
    }
    if (sectionId) {
      query.andWhere(`"section"."id" = ${sectionId}`);
    }
    if (teacherId) {
      query.andWhere(`"teacher"."id" = ${teacherId}`);
    }
    if (status) {
      query.andWhere(`"schoolYear"."status" = '${ESchoolYearStatus[status]}'`);
    } else {
      query.andWhere(`"schoolYear"."status" IN (:...activeSchoolYearStatus)`, {
        activeSchoolYearStatus: [null, ...activeSchoolYearStatus],
      });
    }
    query.orderBy(`"schoolYear"."id"`, 'DESC');
    return query.getOne();
  }

  async getCurrentAssignationOrThrow(currentAssignationDto: CurrentAssignationDto): Promise<SchoolYear> {
    const currentAssignation = await this.getCurrentAssignation(currentAssignationDto);
    if (!currentAssignation) {
      throw new NotFoundException('No se encontró año escolar activo');
    }
    return currentAssignation;
  }
}
