import { EntityRepository, Repository, In } from 'typeorm';
import { SectionDetail } from '@academics/entities/section-detail.entity';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { Section } from '@academics/entities/section.entity';
import { activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { NotFoundException } from '@nestjs/common';

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

  findSectionDetail(shiftId: number, gradeId: number, sectionId: number): Promise<SectionDetail | undefined> {
    return this.createQueryBuilder('sectionDetail')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .leftJoin('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoin('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoin('cycleDetail.schoolYear', 'schoolYear')
      .leftJoin('cycleDetail.shift', 'shift')
      .leftJoin('gradeDetail.grade', 'grade')
      .where(`"shift"."id" = ${shiftId}`)
      .andWhere(`"grade"."id" = ${gradeId}`)
      .andWhere(`"section"."id" = ${sectionId}`)
      .andWhere(`"schoolYear"."status" IN (:...activeSchoolYearStatus)`, {
        activeSchoolYearStatus: [null, ...activeSchoolYearStatus],
      })
      .getOne();
  }

  async findSectionDetailOrThrow(shiftId: number, gradeId: number, sectionId: number): Promise<SectionDetail> {
    const sectionDetail = await this.findSectionDetail(shiftId, gradeId, sectionId);

    if (!sectionDetail) {
      throw new NotFoundException('Asignación de turno, grado y sección no encontrada');
    }

    return sectionDetail;
  }

  async findByIdOrThrow(sectionDetailId: number): Promise<SectionDetail> {
    const sectionDetail = await this.createQueryBuilder('sectionDetail')
      .leftJoinAndSelect('sectionDetail.students', 'student')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .leftJoinAndSelect('sectionDetail.teacher', 'teacher')
      .leftJoinAndSelect('student.images', 'image')
      .leftJoinAndSelect('image.grade', 'grade')
      .andWhere(`sectionDetail.id = ${sectionDetailId}`)
      .orderBy(`student.lastname`, 'ASC')
      .orderBy(`student.firstname`, 'ASC')
      .getOne();

    if (!sectionDetail) {
      throw new NotFoundException(`No se encontró el detalle del grado solicitado`);
    }

    return sectionDetail;
  }
}
