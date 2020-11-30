import { AcademicsModule } from '@academics/academics.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuetionBankController } from './controllers/question-bank.controller';
import { SociometricTestDetailController } from './controllers/sociometric-test-detail.controller';
import { SociometricTestController } from './controllers/sociometric-test.controller';
import { AnswerRepository } from './repositories/answer.repository';
import { QuestionBankRepository } from './repositories/question-bank.repository';
import { QuestionRepository } from './repositories/question.repository';
import { SociometricTestDetailRepository } from './repositories/sociometric-test-detail.repository';
import { SociometricTestRepository } from './repositories/sociometric-test.repository';
import { QuestionBankService } from './services/question-bank.service';
import { SociometricTestDetailService } from './services/sociometric-test-detail.service';
import { SociometricTestService } from './services/sociometric-test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SociometricTestRepository,
      QuestionBankRepository,
      QuestionRepository,
      SociometricTestDetailRepository,
      AnswerRepository,
    ]),
    AcademicsModule,
  ],
  controllers: [SociometricTestController, QuetionBankController, SociometricTestDetailController],
  providers: [SociometricTestService, QuestionBankService, SociometricTestDetailService],
})
export class SociometricsModule {}
