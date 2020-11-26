import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuetionBankController } from './controllers/question-bank.controller';
import { Question } from './entities/quetion.entity';
import { QuestionBankRepository } from './repositories/question-bank.repository';
import { QuestionBankService } from './services/question-bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionBankRepository, Question])],
  controllers: [QuetionBankController],
  providers: [QuestionBankService],
})
export class SociometricsModule {}
