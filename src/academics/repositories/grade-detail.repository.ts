import { EntityRepository, Repository, In } from 'typeorm';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { SchoolYear } from '@academics/entities/school-year.entity';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { Grade } from '@academics/entities/grade.entity';

@EntityRepository(GradeDetail)
export class GradeDetailRepository extends Repository<GradeDetail> {
  findGradeDetails(cycleDetailIds: number[]): Promise<GradeDetail[]> {
    return this.createQueryBuilder('gradeDetail')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .where('cycleDetail.id IN (:...cycleDetailIds)', { cycleDetailIds: [null, ...cycleDetailIds] })
      .loadRelationIdAndMap('gradeDetail.cycleDetail', 'gradeDetail.cycleDetail')
      .loadRelationIdAndMap('gradeDetail.grade', 'gradeDetail.grade')
      .getMany();
  }

  async findOrCreateGradeDetails(
    cycleDetails: CycleDetail[],
    cycleDetail: CycleDetail | undefined,
    gradeIds: number[],
  ): Promise<GradeDetail[]> {
    const existingGradeDetails = await this.find({
      where: { grade: In(gradeIds), cycleDetail: In(cycleDetails.map(cDetail => cDetail.id)) },
    });

    if (existingGradeDetails.length === gradeIds.length) {
      return existingGradeDetails;
    }

    const existingGradeDetailIds = existingGradeDetails.map(gDetail => gDetail.grade.id);
    const missingGradeDetails: { cycleDetail: CycleDetail | undefined; grade: Grade }[] = [];

    gradeIds.forEach(id => {
      if (!existingGradeDetailIds.includes(id)) {
        missingGradeDetails.push({
          cycleDetail,
          grade: { id } as Grade,
        });
      }
    });
    const newGradeDetails = await this.save(missingGradeDetails);
    return [...existingGradeDetails, ...newGradeDetails];
  }
}
