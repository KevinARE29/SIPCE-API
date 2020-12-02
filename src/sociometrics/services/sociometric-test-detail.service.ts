import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EQuestionType } from '@sociometrics/constants/sociometric.constant';
import { SociometricTestDetailResponse } from '@sociometrics/docs/sociometric-test-detail-response.doc';
import { SociometricTestDetail } from '@sociometrics/docs/sociometric-test-detail.doc';
import { AnswerDto } from '@sociometrics/dtos/answer.dto';
import { AnswerRepository } from '@sociometrics/repositories/answer.repository';
import { QuestionRepository } from '@sociometrics/repositories/question.repository';
import { SociometricTestDetailRepository } from '@sociometrics/repositories/sociometric-test-detail.repository';
import { SociometricTestRepository } from '@sociometrics/repositories/sociometric-test.repository';
import { plainToClass } from 'class-transformer';
import { LessThan, MoreThan } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class SociometricTestDetailService {
  constructor(
    private readonly sociometricTestDetailRepository: SociometricTestDetailRepository,
    private readonly sociometricTestRepository: SociometricTestRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  @Transactional()
  async updateSociometricTestDetail(
    sociometricTestId: number,
    studentId: number,
    { questionId, studentIds, connotation }: AnswerDto,
  ): Promise<void> {
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId);
    const { answersPerQuestion } = sociometricTest;
    if (answersPerQuestion !== studentIds.length) {
      throw new BadRequestException(
        `studentsIds: El número de opciones a seleccionar deben ser ${sociometricTest.answersPerQuestion}`,
      );
    }
    if (studentIds.includes(studentId)) {
      throw new BadRequestException(`studentsIds: Un estudiante no puede seleccionarse a sí mismo en una respuesta`);
    }

    const [sociometricTestDetail, question] = await Promise.all([
      this.sociometricTestDetailRepository.findOrCreate(sociometricTestId, studentId),
      this.questionRepository.findByIdOrThrow(questionId),
    ]);

    if (sociometricTestDetail.finished) {
      throw new UnprocessableEntityException(
        `La prueba sociométrica especificada ha sido finalizada y no se puede modificar`,
      );
    }

    if (question.type === EQuestionType.LIDERAZGO && !connotation) {
      throw new BadRequestException(
        `questionId: Las preguntas de liderazgo sólo pueden tener respuestas en connotación positiva`,
      );
    }

    await this.answerRepository.delete({
      question,
      sociometricTestDetail,
      ponderation: connotation ? MoreThan(0) : LessThan(0),
    });

    await Promise.all(
      studentIds.map(async (id, index) => {
        const ponderation = answersPerQuestion - index;
        await this.answerRepository.save({
          question,
          student: { id },
          sociometricTestDetail,
          ponderation: connotation ? ponderation : -ponderation,
        });
      }),
    );
  }

  async getSociometricTestDetail(sociometricTestId: number, studentId: number): Promise<SociometricTestDetailResponse> {
    const sociometricTestDetail = await this.sociometricTestDetailRepository.findOrCreate(sociometricTestId, studentId);
    const {
      sectionDetail: { section, gradeDetail: { grade } } = {
        section: undefined,
        gradeDetail: { grade: undefined },
      },
      ...sociometricTest
    } = sociometricTestDetail.sociometricTest;
    return {
      data: plainToClass(
        SociometricTestDetail,
        { ...sociometricTestDetail, sociometricTest: { ...sociometricTest, grade, section } },
        { excludeExtraneousValues: true },
      ),
    };
  }

  async finishSociometricTestDetail(sociometricTestId: number, studentId: number): Promise<void> {
    const [
      {
        questionBank: { questions },
      },
      sociometricTestDetail,
    ] = await Promise.all([
      this.sociometricTestRepository.findByIdOrThrow(sociometricTestId),
      this.sociometricTestDetailRepository.findOrCreate(sociometricTestId, studentId),
    ]);

    const questionIdsFromQuestionBank = questions.map(question => question.id);
    const questionIdsFromAnwers = sociometricTestDetail.answers.map(answer => answer.question.id);
    const finished = questionIdsFromQuestionBank.every(v => questionIdsFromAnwers.includes(v));
    if (!finished) {
      throw new BadRequestException(
        `La prueba no se puede finalizar porque aún tiene preguntas pendientes de contestar`,
      );
    }
    await this.sociometricTestDetailRepository.save({ ...sociometricTestDetail, finished: true });
  }
}
