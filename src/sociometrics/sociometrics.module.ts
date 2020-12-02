import { AcademicsModule } from '@academics/academics.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuetionBankController } from './controllers/question-bank.controller';
import { SociometricMatrixController } from './controllers/sociometric-matrix.controller';
import { SociometricTestDetailController } from './controllers/sociometric-test-detail.controller';
import { SociometricTestController } from './controllers/sociometric-test.controller';
import { AnswerRepository } from './repositories/answer.repository';
import { QuestionBankRepository } from './repositories/question-bank.repository';
import { QuestionRepository } from './repositories/question.repository';
import { SociometricTestDetailRepository } from './repositories/sociometric-test-detail.repository';
import { SociometricTestRepository } from './repositories/sociometric-test.repository';
import { QuestionBankService } from './services/question-bank.service';
import { SociometricMatrixService } from './services/sociometric-matrix.service';
import { SociometricTestDetailService } from './services/sociometric-test-detail.service';
import { SociometricTestService } from './services/sociometric-test.service';
import { PresetRepository } from './repositories/preset.repository';
import { PresetService } from './services/preset.service';
import { PresetController } from './controllers/preset.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SociometricTestRepository,
      QuestionBankRepository,
      QuestionRepository,
      SociometricTestDetailRepository,
      AnswerRepository,
      PresetRepository,
    ]),
    AcademicsModule,
  ],
  controllers: [
    SociometricTestController,
    QuetionBankController,
    SociometricTestDetailController,
    SociometricMatrixController,
    PresetController
  ],
  providers: [SociometricTestService, QuestionBankService, SociometricTestDetailService, SociometricMatrixService, PresetService],
})
export class SociometricsModule {}
