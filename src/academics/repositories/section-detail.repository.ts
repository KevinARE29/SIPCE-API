import { EntityRepository, Repository } from 'typeorm';
import { SectionDetail } from '@academics/entities/section-detail.entity';

@EntityRepository(SectionDetail)
export class SectionDetailRepository extends Repository<SectionDetail> {
  findSectionDetails(gradeDetailIds: number[]): Promise<SectionDetail[]> {
    return this.createQueryBuilder('sectionDetail')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .where('gradeDetail.id IN (:...gradeDetailIds)', { gradeDetailIds })
      .loadRelationIdAndMap('sectionDetail.gradeDetail', 'sectionDetail.gradeDetail')
      .loadRelationIdAndMap('sectionDetail.section', 'sectionDetail.section')
      .getMany();
  }
}
