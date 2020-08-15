import { EntityRepository, Repository, In } from 'typeorm';
import { SectionDetail } from '@academics/entities/section-detail.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { Section } from '@academics/entities/section.entity';

@EntityRepository(SectionDetail)
export class SectionDetailRepository extends Repository<SectionDetail> {
  findSectionDetails(gradeDetailIds: number[]): Promise<SectionDetail[]> {
    return this.createQueryBuilder('sectionDetail')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .where('gradeDetail.id IN (:...gradeDetailIds)', { gradeDetailIds: [null, ...gradeDetailIds] })
      .getMany();
  }

  async findOrCreateSectionDetails(
    gradeDetails: GradeDetail[],
    gradeDetail: GradeDetail | undefined,
    sectionIds: number[],
  ): Promise<SectionDetail[]> {
    const existingSectionDetails = await this.find({
      where: { section: In(sectionIds), gradeDetail },
    });

    if (existingSectionDetails.length === sectionIds.length) {
      return existingSectionDetails;
    }

    const existingSectionDetailIds = existingSectionDetails.map(sDetail => sDetail.section.id);
    const missingSectionDetails: { gradeDetail: GradeDetail | undefined; section: Section }[] = [];

    sectionIds.forEach(id => {
      if (!existingSectionDetailIds.includes(id)) {
        missingSectionDetails.push({
          gradeDetail,
          section: { id } as Section,
        });
      }
    });
    const newSectionDetails = await this.save(missingSectionDetails);
    return [...existingSectionDetails, ...newSectionDetails];
  }
}
