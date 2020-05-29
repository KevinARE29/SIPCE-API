import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsNull } from 'typeorm';
import { ResetPswDto } from 'src/auth/dtos/reset-psw.dto';
import { UpdatePswDto } from 'src/auth/dtos/update-psw.dto';
import { TokensService } from 'src/auth/services/token.service';
import { User } from '../entities/users.entity';
import { UserRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(private readonly userRepository: UserRepository, private readonly tokensService: TokensService) {}

  getHash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  compareHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async findByIdOrThrow(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, { where: { deletedAt: IsNull() } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  findByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findUserByUsername(username);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email, deletedAt: IsNull() } });
  }

  updateUser(user: User, updateUserDto: ResetPswDto | UpdatePswDto) {
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  updatePsw(user: User, newPsw: string): Promise<User> {
    const password = this.getHash(newPsw);
    return this.updateUser(user, { password });
  }

  async resetPsw(resetPswDto: ResetPswDto, updatePswDto: UpdatePswDto): Promise<void> {
    const pswTokenPayload = this.tokensService.getPswTokenPayload(resetPswDto.resetPasswordToken);
    const user = await this.findByIdOrThrow(pswTokenPayload.id);
    if (user.resetPasswordToken !== resetPswDto.resetPasswordToken) {
      throw new ConflictException('Invalid Reset Password Token');
    }
    const password = this.getHash(updatePswDto.password);
    this.userRepository.save({
      ...user,
      password,
      resetPasswordToken: null,
    });
  }
}
