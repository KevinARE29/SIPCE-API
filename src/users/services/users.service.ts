import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsNull } from 'typeorm';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  getHash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  compareHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  findByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findUserByUsername(username);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email, deletedAt: IsNull() } });
    return user;
  }

  updateResetPswToken(resetPasswordToken: string, user: User): Promise<User> {
    return this.userRepository.save({ ...user, resetPasswordToken });
  }
}
