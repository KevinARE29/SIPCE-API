import { ConflictException, Injectable } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { QuestionBankRepository } from '@sociometrics/repositories/question-bank.repository';
import { QuestionBankFilterDto } from '@sociometrics/dtos/question-bank-filter.dto';
import { QuestionBanksResponse } from '@sociometrics/docs/question-banks-response.doc';
import { QuestionBank } from '@sociometrics/docs/question-bank.doc';
import { plainToClass } from 'class-transformer';
import { QuestionBankResponse } from '@sociometrics/docs/question-bank-response.doc';
import { QuestionBankDto } from '@sociometrics/dtos/question-bank.dto';
import { QuestionRepository } from '@sociometrics/repositories/question.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class QuestionBankService {
  constructor(
    private readonly questionBankRepository: QuestionBankRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async getAllQuestionBanks(
    counselorId: number,
    pageDto: PageDto,
    questionBankFilterDto: QuestionBankFilterDto,
  ): Promise<QuestionBanksResponse> {
    if (questionBankFilterDto.paginate === 'false') {
      const [questionBanks] = await this.questionBankRepository.getAllQuestionBanks(
        pageDto,
        questionBankFilterDto,
        counselorId,
      );
      return { data: plainToClass(QuestionBank, questionBanks, { excludeExtraneousValues: true }) };
    }

    const [questionBanks, count] = await this.questionBankRepository.getAllQuestionBanks(
      pageDto,
      questionBankFilterDto,
      counselorId,
    );
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(QuestionBank, questionBanks, { excludeExtraneousValues: true }), pagination };
  }

  @Transactional()
  async createQuestionBank(counselorId: number, createQuestionBankDto: QuestionBankDto): Promise<QuestionBankResponse> {
    const duplicatedQuestionBank = await this.questionBankRepository.getQuestionBankByName(
      createQuestionBankDto.name,
      counselorId,
    );
    if (duplicatedQuestionBank) {
      throw new ConflictException('name: Ya existe un banco de preguntas con ese nombre');
    }

    const questionBank = await this.questionBankRepository.save({
      ...createQuestionBankDto,
      counselor: { id: counselorId },
    });

    const questions = createQuestionBankDto.questions.map(question => ({ ...question, questionBank }));
    await this.questionRepository.save(questions);

    return {
      data: plainToClass(QuestionBank, questionBank, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async getQuestionBank(counselorId: number, questionBankId: number): Promise<QuestionBankResponse> {
    const questionBank = await this.questionBankRepository.findByIdOrThrow(questionBankId, counselorId);

    return {
      data: plainToClass(QuestionBank, questionBank, {
        excludeExtraneousValues: true,
      }),
    };
  }

  @Transactional()
  async updateQuestionBank(
    counselorId: number,
    questionBankId: number,
    updateQuestionBankDto: QuestionBankDto,
  ): Promise<QuestionBankResponse> {
    const questionBank = await this.questionBankRepository.findByIdOrThrow(questionBankId, counselorId);
    // TODO: Add validation if there are any sociometric test associated

    await this.questionRepository.delete({ questionBank });
    const questions = updateQuestionBankDto.questions.map(question => ({ ...question, questionBank }));
    await this.questionRepository.save(questions);
    return {
      data: plainToClass(
        QuestionBank,
        await this.questionBankRepository.save({
          ...questionBank,
          ...updateQuestionBankDto,
          questions,
          counselor: { id: counselorId },
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async deleteQuestionBank(counselorId: number, questionBankId: number): Promise<void> {
    const questionBank = await this.questionBankRepository.findByIdOrThrow(questionBankId, counselorId);
    // TODO: Add validation if there are any sociometric test associated
    questionBank.deletedAt = new Date();
    await this.questionBankRepository.save(questionBank);
  }
}
