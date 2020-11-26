import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { QuestionBank } from '@sociometrics/entities/quetion-bank.entity';
import { getOrderBy } from '@core/utils/sort.util';
import { QuestionBankFilterDto, questionBankSortOptionsMap } from '@sociometrics/dtos/question-bank-filter.dto';

@EntityRepository(QuestionBank)
export class QuestionBankRepository extends Repository<QuestionBank> {
  async findByIdOrThrow(id: number, counselorId: number): Promise<QuestionBank> {
    const questionBank = await this.findOne({
      where: { id, counselor: { id: counselorId } },
      relations: ['questions'],
    });
    if (!questionBank) {
      throw new NotFoundException(`Banco de preguntas con id ${id} no encontrado`);
    }
    return questionBank;
  }

  getAllQuestionBanks(
    pageDto: PageDto,
    questionBankFilterDto: QuestionBankFilterDto,
    counselorId: number,
  ): Promise<[QuestionBank[], number]> {
    const { page, perPage } = pageDto;
    const { sort, paginate, name } = questionBankFilterDto;
    const query = this.createQueryBuilder('questionBank')
      .leftJoin(`questionBank.counselor`, `counselor`)
      .leftJoinAndSelect(`questionBank.questions`, `question`)
      .andWhere(`counselor.id = ${counselorId}`)
      .andWhere('questionBank.deletedAt is null');

    if (name) {
      query.andWhere(`questionBank.name ILIKE '%${name}%'`);
    }

    if (paginate === 'false') {
      query.orderBy({ 'questionBank.name': 'ASC' });
      return query.getManyAndCount();
    }

    query.take(perPage);
    query.skip((page - 1) * perPage);
    if (sort) {
      const order = getOrderBy(sort, questionBankSortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'questionBank.id': 'DESC' });
    }
    return query.getManyAndCount();
  }

  getQuestionBankByName(name: string, counselorId: number): Promise<QuestionBank | undefined> {
    return this.createQueryBuilder('questionBank')
      .leftJoin(`questionBank.counselor`, `counselor`)
      .where('LOWER(questionBank.name) = LOWER(:name)', { name })
      .andWhere(`counselor.id = ${counselorId}`)
      .andWhere('questionBank.deletedAt is null')
      .getOne();
  }
}
