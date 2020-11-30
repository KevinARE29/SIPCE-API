import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SociometricTestFilterDto } from '@sociometrics/dtos/sociometric-test-filter.dto';
import { SociometricTestRepository } from '@sociometrics/repositories/sociometric-test.repository';
import { SociometricTest } from '@sociometrics/docs/sociometric-test.doc';
import { SociometricTestsResponse } from '@sociometrics/docs/sociometric-tests-response.doc';
import { SociometricTestDto } from '@sociometrics/dtos/sociometric-test.dto';
import { SociometricTestResponse } from '@sociometrics/docs/sociometric-test-response.doc';
import { QuestionBankRepository } from '@sociometrics/repositories/question-bank.repository';
import { SectionDetailRepository } from '@academics/repositories';

@Injectable()
export class SociometricTestService {
  constructor(
    private readonly sociometricTestRepository: SociometricTestRepository,
    private readonly questionBankRepository: QuestionBankRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
  ) {}

  async getAllSociometricTests(
    counselorId: number,
    pageDto: PageDto,
    sociometricTestFilterDto: SociometricTestFilterDto,
  ): Promise<SociometricTestsResponse> {
    const [sociometricTests, count] = await this.sociometricTestRepository.getAllSociometricTests(
      pageDto,
      sociometricTestFilterDto,
      counselorId,
    );

    const mappedSociometricTests = sociometricTests.map(sociometricTest => {
      const {
        sociometricTestDetails,
        sectionDetail: {
          section,
          students,
          gradeDetail: {
            grade,
            cycleDetail: { shift },
          },
        },
        ...test
      } = sociometricTest;

      const completedStudents = sociometricTestDetails.filter(sociometricTestDetail => sociometricTestDetail.finished)
        .length;
      return { ...test, shift, grade, section, totalStudents: students.length, completedStudents };
    });

    const pagination = getPagination(pageDto, count);
    return {
      data: plainToClass(SociometricTest, mappedSociometricTests, { excludeExtraneousValues: true }),
      pagination,
    };
  }

  async createSociometricTest(
    counselorId: number,
    sociometricTestDto: SociometricTestDto,
  ): Promise<SociometricTestResponse> {
    const { questionBankId, shiftId, gradeId, sectionId, answersPerQuestion } = sociometricTestDto;
    const [questionBank, sectionDetail] = await Promise.all([
      this.questionBankRepository.findByIdOrThrow(questionBankId, counselorId),
      this.sectionDetailRepository.findSectionDetailOrThrow(shiftId, gradeId, sectionId),
    ]);

    const existingSociometricTest = await this.sociometricTestRepository.findBySectionDetail(sectionDetail);
    if (existingSociometricTest) {
      throw new UnprocessableEntityException(
        'Ya existe una prueba sociométrica para el grado y sección especificados en el año escolar en curso',
      );
    }

    const sociometricTest = await this.sociometricTestRepository.save({
      answersPerQuestion,
      questionBank,
      sectionDetail,
    });
    return {
      data: plainToClass(SociometricTest, sociometricTest, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async getSociometricTest(counselorId: number, sociometricTestId: number): Promise<SociometricTestResponse> {
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId, counselorId);
    const {
      sectionDetail: {
        section,
        students,
        gradeDetail: {
          grade,
          cycleDetail: { shift },
        },
      },
      sociometricTestDetails,
      ...test
    } = sociometricTest;

    const mappedSociometricTest = { ...test, shift, grade, section };
    const mappedStudents = students.map(student => {
      const completedStudent = sociometricTestDetails.find(testDetail => testDetail.student.id === student.id);
      return { ...student, completed: !!completedStudent };
    });

    return {
      data: plainToClass(
        SociometricTest,
        { ...mappedSociometricTest, students: mappedStudents },
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  @Transactional()
  async updateSociometricTest(
    counselorId: number,
    sociometricTestId: number,
    sociometricTestDto: SociometricTestDto,
  ): Promise<SociometricTestResponse> {
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId, counselorId);

    if (sociometricTest.status !== 'Creada') {
      throw new UnprocessableEntityException(
        'La prueba sociométrica especificada se encuentra activa y no se puede actualizar',
      );
    }

    const { questionBankId, shiftId, gradeId, sectionId } = sociometricTestDto;
    const questionBank = await this.questionBankRepository.findByIdOrThrow(questionBankId, counselorId);
    const sectionDetail = await this.sectionDetailRepository.findSectionDetailOrThrow(shiftId, gradeId, sectionId);

    if (sociometricTest.sectionDetail.id !== sectionDetail.id) {
      const existingSociometricTest = await this.sociometricTestRepository.findBySectionDetail(sectionDetail);
      if (existingSociometricTest) {
        throw new UnprocessableEntityException(
          'Ya existe una prueba sociométrica para el grado y sección especificados en el año escolar en curso',
        );
      }
    }

    return {
      data: plainToClass(
        SociometricTest,
        await this.sociometricTestRepository.save({
          ...sociometricTest,
          ...sociometricTestDto,
          questionBank,
          sectionDetail,
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async deleteSociometricTest(counselorId: number, sociometricTestId: number): Promise<void> {
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId, counselorId);

    if (sociometricTest.status !== 'Creada') {
      throw new UnprocessableEntityException(
        'La prueba sociométrica especificada se encuentra activa y no se puede eliminar',
      );
    }

    sociometricTest.deletedAt = new Date();
    await this.sociometricTestRepository.save(sociometricTest);
  }
}