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
import { StudentRepository } from '@students/repositories';
import { StudentSociometricTestDto } from '@sociometrics/dtos/student-sociometric-test.dto';
import { PresetRepository } from '@sociometrics/repositories/preset.repository';
import { firstBy } from 'thenby';
import { SociometricTestDetailResponse } from '@sociometrics/docs/sociometric-test-detail-response.doc';
import { SociometricTestDetailService } from './sociometric-test-detail.service';

@Injectable()
export class SociometricTestService {
  constructor(
    private readonly sociometricTestRepository: SociometricTestRepository,
    private readonly sociometricTestDetailService: SociometricTestDetailService,
    private readonly questionBankRepository: QuestionBankRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
    private readonly studentRepository: StudentRepository,
    private readonly presetRepository: PresetRepository,
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

  async getSociometricTest(sociometricTestId: number): Promise<SociometricTestResponse> {
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId);
    const {
      sectionDetail: {
        id: sectionDetailId,
        section,
        students,
        gradeDetail: {
          grade,
          cycleDetail: { shift },
        },
      },
      sociometricTestDetails,
      presets,
      ...test
    } = sociometricTest;

    const filteredPresets = presets.filter(preset => !preset.deletedAt);

    const mappedSociometricTest = { ...test, presets: filteredPresets, shift, grade, section };
    const mappedStudents = students.map(student => {
      const completedStudent = sociometricTestDetails.find(
        testDetail => testDetail.student.id === student.id && testDetail.finished,
      );
      return { ...student, completed: !!completedStudent };
    });

    const orderedStudents = mappedStudents.sort(
      firstBy('lastname', { ignoreCase: true, direction: 'asc' }).thenBy('firstname', {
        ignoreCase: true,
        direction: 'asc',
      }),
    );

    return {
      data: plainToClass(
        SociometricTest,
        { ...mappedSociometricTest, students: orderedStudents, sectionDetailId },
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
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId);

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

  async deleteSociometricTest(sociometricTestId: number): Promise<void> {
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId);

    if (sociometricTest.status !== 'Creada') {
      throw new UnprocessableEntityException(
        'La prueba sociométrica especificada se encuentra activa y no se puede eliminar',
      );
    }

    await this.sociometricTestRepository.remove(sociometricTest);
  }

  async getStudentSociometricTest(
    studentSociometricTestDto: StudentSociometricTestDto,
  ): Promise<SociometricTestDetailResponse> {
    const { email, password } = studentSociometricTestDto;
    const { sectionDetails, id: studentId } = await this.studentRepository.findByEmailOrFail(email);
    const {
      startedAt,
      endedAt,
      sociometricTest: { id, sectionDetail },
    } = await this.presetRepository.findPresetByPasswordOrFail(password);
    if (sectionDetails[0].id !== sectionDetail.id) {
      throw new UnprocessableEntityException('No tiene acceso a este cuestionario');
    }
    const currentDate = new Date();
    if (currentDate < startedAt || currentDate > endedAt) {
      throw new UnprocessableEntityException('No puede acceder a este cuestionario, está fuera de horario');
    }
    return this.sociometricTestDetailService.getSociometricTestDetail(id, studentId);
  }
}
