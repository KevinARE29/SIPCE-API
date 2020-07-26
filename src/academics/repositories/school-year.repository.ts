import { EntityRepository, Repository } from 'typeorm';
import { SchoolYear } from '@academics/entities/school-year.entity';
import { activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { SectionDetail } from '@academics/entities/section-detail.entity';
import { CurrentAssignationDto } from '@academics/dtos/current-assignation.dto';

@EntityRepository(SchoolYear)
export class SchoolYearRepository extends Repository<SchoolYear> {
  getCurrentAssignation(currentAssignationDto: CurrentAssignationDto): Promise<SchoolYear | undefined> {
    const { shiftId, cycleId, gradeId, sectionId } = currentAssignationDto;
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
      .leftJoinAndSelect('sectionDetail.teacher', 'teacher')
      .andWhere(`"schoolYear"."status" IN (:...activeSchoolYearStatus)`, {
        activeSchoolYearStatus: [null, ...activeSchoolYearStatus],
      });
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
    return query.getOne();
  }
}
