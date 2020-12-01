import { SectionDetailRepository } from '@academics/repositories';
import { Injectable } from '@nestjs/common';
import { AnswerRepository } from '@sociometrics/repositories/answer.repository';
import { SociometricTestRepository } from '@sociometrics/repositories/sociometric-test.repository';
import { generateSocioMatrix, getSociometrixValuesAndIndexes } from '@sociometrics/utils/sociometric-matrix.util';

@Injectable()
export class SociometricMatrixService {
  constructor(
    private readonly sociometricTestRepository: SociometricTestRepository,
    private readonly answerRepository: AnswerRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
  ) {}

  async getSociometricMatrix(sociometricTestId: number, questionId: number): Promise<any> {
    const [sociometricTest, answers] = await Promise.all([
      this.sociometricTestRepository.findByIdOrThrow(sociometricTestId),
      this.answerRepository.getAnswers(sociometricTestId, questionId),
    ]);

    const { students } = await this.sectionDetailRepository.findByIdOrThrow(sociometricTest.sectionDetail.id);

    const { answersPerQuestion } = sociometricTest;
    const socioMatrix = generateSocioMatrix(students, answers);
    const socioValuesAndIndexes = getSociometrixValuesAndIndexes(socioMatrix, students, answersPerQuestion);
    console.table(socioMatrix);
    return socioValuesAndIndexes;
  }
}
