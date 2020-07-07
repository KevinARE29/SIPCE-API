import { EntityRepository, Repository } from 'typeorm';
import { GradeDetail } from '@academics/entities/grade-detail.entity';

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
}
