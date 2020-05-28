import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsNull } from 'typeorm';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(private readonly userRepository: UserRepository) {}

  getHash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  compareHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async updatePsw(id: number, newPsw: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const password = this.getHash(newPsw);
    return this.userRepository.save({
      ...user,
      password,
    });
  }

  findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id, { where: { deletedAt: IsNull() } });
  }

  findByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findUserByUsername(username);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email, deletedAt: IsNull() } });
  }

  updateResetPswToken(resetPasswordToken: string, user: User): Promise<User> {
    return this.userRepository.save({ ...user, resetPasswordToken });
  }
}
