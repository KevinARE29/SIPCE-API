/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { SectionDetailRepository } from '@academics/repositories';
import { Injectable } from '@nestjs/common';
import { SociometricMatrix } from '@sociometrics/docs/sociometric-matrix-doc';
import { SociometricMatrixResponse } from '@sociometrics/docs/sociometric-matrix-response.doc';
import { AnswerRepository } from '@sociometrics/repositories/answer.repository';
import { QuestionRepository } from '@sociometrics/repositories/question.repository';
import { SociometricTestRepository } from '@sociometrics/repositories/sociometric-test.repository';
import { generateSocioMatrix, getSociometrixValuesAndIndexes } from '@sociometrics/utils/sociometric-matrix.util';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SociometricMatrixService {
  constructor(
    private readonly sociometricTestRepository: SociometricTestRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
  ) {}

  async getSociometricMatrix(sociometricTestId: number, questionId: number): Promise<SociometricMatrixResponse> {
    const [sociometricTest, answers, question] = await Promise.all([
      this.sociometricTestRepository.findByIdOrThrow(sociometricTestId),
      this.answerRepository.getAnswers(sociometricTestId, questionId),
      this.questionRepository.findByIdOrThrow(questionId),
    ]);

    const { students } = await this.sectionDetailRepository.findByIdOrThrow(sociometricTest.sectionDetail.id);

    const { answersPerQuestion } = sociometricTest;
    const sociomatrix = generateSocioMatrix(students, answers, question.type);
    const socioValuesAndIndexes = getSociometrixValuesAndIndexes(
      sociomatrix,
      students,
      answersPerQuestion,
      question.type,
    );

    const answersPerStudent = [];
    for (const student of students) {
      const myAnswersP = answers
        .filter(answer => answer.sociometricTestDetail.student.id === student.id && answer.ponderation > 0)
        .map(answer => answer.student);
      const myAnswersN = answers
        .filter(answer => answer.sociometricTestDetail.student.id === student.id && answer.ponderation < 0)
        .map(answer => answer.student);
      const studentsAnswersP = answers
        .filter(answer => answer.student.id === student.id && answer.ponderation > 0)
        .map(answer => answer.student);
      const studentsAnswersN = answers
        .filter(answer => answer.student.id === student.id && answer.ponderation < 0)
        .map(answer => answer.student);
      answersPerStudent.push({
        myAnswers: { answersP: myAnswersP, answersN: myAnswersN },
        studentsAnswers: { answersP: studentsAnswersP, answersN: studentsAnswersN },
      });
    }

    const {
      sectionDetail: {
        section: { name: section },
        gradeDetail: {
          grade: { name: grade },
          cycleDetail: {
            shift: { name: shift },
            schoolYear: { year },
          },
        },
      },
    } = sociometricTest;
    console.table(sociomatrix);

    return {
      data: plainToClass(
        SociometricMatrix,
        {
          question,
          participants: students,
          sociomatrix,
          ...socioValuesAndIndexes,
          answersPerStudent,
          year,
          shift,
          grade,
          section,
        },
        { excludeExtraneousValues: true },
      ),
    };
  }
}
