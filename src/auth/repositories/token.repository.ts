import { EntityRepository, Repository } from 'typeorm';
import { Token } from '../entities/token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  findByUserId(userId: number): Promise<Token | undefined> {
    return this.findOne({ where: { userId } });
  }
}
