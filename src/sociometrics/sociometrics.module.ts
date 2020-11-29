import { AcademicsModule } from '@academics/academics.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuetionBankController } from './controllers/question-bank.controller';
import { SociometricTestController } from './controllers/sociometric-test.controller';
import { QuestionBankRepository } from './repositories/question-bank.repository';
import { QuestionRepository } from './repositories/question.repository';
import { SociometricTestRepository } from './repositories/sociometric-test.repository';
import { QuestionBankService } from './services/question-bank.service';
import { SociometricTestService } from './services/sociometric-test.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SociometricTestRepository, QuestionBankRepository, QuestionRepository]),
    AcademicsModule,
  ],
  controllers: [SociometricTestController, QuetionBankController],
  providers: [SociometricTestService, QuestionBankService],
})
export class SociometricsModule {}
