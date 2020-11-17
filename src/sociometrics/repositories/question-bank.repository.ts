import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { QuestionBank } from '@sociometrics/entities/quetion-bank.entity';
import { User } from '@users/entities/users.entity';
import { getOrderBy } from '@core/utils/sort.util';
import { QuestionBankFilterDto, questionBankSortOptionsMap } from '@sociometrics/dtos/question-bank-filter.dto';

@EntityRepository(QuestionBank)
export class QuestionBankRepository extends Repository<QuestionBank> {
  async findByIdOrThrow(id: number, counselor: User): Promise<QuestionBank> {
    const questionBank = await this.findOne({ where: { id, counselor }, relations: ['questions'] });
    if (!questionBank) {
      throw new NotFoundException(`Banco de preguntas con id ${id} no encontrado`);
    }
    return questionBank;
  }

  getAllQuestionBanks(
    pageDto: PageDto,
    questionBankFilterDto: QuestionBankFilterDto,
  ): Promise<[QuestionBank[], number]> {
    const { page, perPage } = pageDto;
    const { sort, paginate, name } = questionBankFilterDto;
    const query = this.createQueryBuilder('questionBank').andWhere('questionBank.deletedAt is null');

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
}
