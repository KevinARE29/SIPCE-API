import { NotFoundException } from '@nestjs/common';
import { Question } from '@sociometrics/entities/quetion.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async findByIdOrThrow(id: number): Promise<Question> {
    const question = await this.findOne(id);
    if (!question) {
      throw new NotFoundException(`Pregunta con id ${id} no encontrada`);
    }
    return question;
  }
}
