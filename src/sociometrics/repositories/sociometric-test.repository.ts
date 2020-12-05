import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getOrderBy } from '@core/utils/sort.util';
import {
  SociometricTestFilterDto,
  sociometricTestSortOptionsMap,
} from '@sociometrics/dtos/sociometric-test-filter.dto';
import { SociometricTest } from '@sociometrics/entities/sociometric-test.entity';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { SectionDetail } from '@academics/entities/section-detail.entity';

@EntityRepository(SociometricTest)
export class SociometricTestRepository extends Repository<SociometricTest> {
  async findByIdOrThrow(id: number): Promise<SociometricTest> {
    const questionBank = await this.createQueryBuilder('sociometricTest')
      .leftJoinAndSelect(`sociometricTest.sectionDetail`, `sectionDetail`)
      .leftJoinAndSelect(`sociometricTest.questionBank`, `questionBank`)
      .leftJoinAndSelect(`questionBank.questions`, `question`)
      .leftJoinAndSelect(`sociometricTest.presets`, `preset`)
      .leftJoinAndSelect(`sociometricTest.sociometricTestDetails`, `sociometricTestDetail`)
      .leftJoinAndSelect(`sociometricTestDetail.student`, `student`)
      .leftJoinAndSelect(`sectionDetail.students`, `students`)
      .leftJoinAndSelect(`sectionDetail.section`, `section`)
      .leftJoinAndSelect(`sectionDetail.gradeDetail`, `gradeDetail`)
      .leftJoinAndSelect(`gradeDetail.cycleDetail`, `cycleDetail`)
      .leftJoinAndSelect(`gradeDetail.counselor`, `counselor`)
      .leftJoinAndSelect(`gradeDetail.grade`, `grade`)
      .leftJoinAndSelect(`cycleDetail.shift`, `shift`)
      .andWhere(`sociometricTest.id = ${id}`)
      .getOne();

    if (!questionBank) {
      throw new NotFoundException(`Prueba sociométrica con id ${id} no encontrada`);
    }
    return questionBank;
  }

  findBySectionDetail(sectionDetail: SectionDetail): Promise<SociometricTest | undefined> {
    return this.findOne({
      where: { sectionDetail },
    });
  }

  getAllSociometricTests(
    pageDto: PageDto,
    sociometricTestFilterDto: SociometricTestFilterDto,
    counselorId: number,
  ): Promise<[SociometricTest[], number]> {
    const { page, perPage } = pageDto;
    const { sort, shift, grade, section, status, historical } = sociometricTestFilterDto;
    const query = this.createQueryBuilder('sociometricTest')
      .leftJoinAndSelect(`sociometricTest.sectionDetail`, `sectionDetail`)
      .leftJoinAndSelect(`sociometricTest.sociometricTestDetails`, `sociometricTestDetail`)
      .leftJoinAndSelect(`sectionDetail.students`, `student`)
      .leftJoinAndSelect(`sectionDetail.section`, `section`)
      .leftJoinAndSelect(`sectionDetail.gradeDetail`, `gradeDetail`)
      .leftJoinAndSelect(`gradeDetail.cycleDetail`, `cycleDetail`)
      .leftJoinAndSelect(`gradeDetail.counselor`, `counselor`)
      .leftJoinAndSelect(`gradeDetail.grade`, `grade`)
      .leftJoinAndSelect(`cycleDetail.shift`, `shift`)
      .leftJoinAndSelect(`cycleDetail.schoolYear`, `schoolYear`)
      .andWhere(`counselor.id = ${counselorId}`)
      .andWhere('sociometricTest.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sociometricTestSortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'sociometricTest.id': 'DESC' });
    }

    if (shift) {
      query.andWhere(`shift.id = ${shift}`);
    }

    if (grade) {
      query.andWhere(`grade.id = ${grade}`);
    }

    if (section) {
      query.andWhere(`section.id = ${section}`);
    }

    if (status) {
      query.andWhere(`sociometricTest.status = '${status}'`);
    }

    if (historical === 'true') {
      query.andWhere(`schoolYear.status = '${ESchoolYearStatus['Histórico']}'`);
    }

    return query.getManyAndCount();
  }
}
