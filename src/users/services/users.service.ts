import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsNull } from 'typeorm';
import { ResetPswTokenDto } from '@auth/dtos/reset-psw-token.dto';
import { UpdatePswDto } from '@auth/dtos/update-psw.dto';
import { TokensService } from '@auth/services/token.service';
import { User } from '@users/entities/users.entity';
import { UserRepository } from '@users/repositories/users.repository';
import { ResetPswDto } from '@auth/dtos/reset-psw.dto';

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

  updateUser(user: User, updateUserDto: ResetPswTokenDto | ResetPswDto) {
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  updatePsw(user: User, updatePswDto: UpdatePswDto): Promise<User> {
    if (!this.compareHash(updatePswDto.oldPassword, user.password)) {
      throw new BadRequestException('oldPassword: La contraseña es incorrecta');
    }
    const password = this.getHash(updatePswDto.newPassword);
    return this.updateUser(user, { password });
  }

  async resetPsw(resetPswTokenDto: ResetPswTokenDto, resetPswDto: ResetPswDto): Promise<void> {
    const pswTokenPayload = this.tokensService.getPswTokenPayload(resetPswTokenDto.resetPasswordToken);
    const user = await this.findByIdOrThrow(pswTokenPayload.id);
    if (user.resetPasswordToken !== resetPswTokenDto.resetPasswordToken) {
      throw new BadRequestException('resetPasswordToken: Reset Password Token inválido');
    }

    const password = this.getHash(resetPswDto.password);
    this.userRepository.save({
      ...user,
      password,
      resetPasswordToken: null,
    });
  }
}
