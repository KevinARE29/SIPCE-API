/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IsNull, In } from 'typeorm';
import { ResetPswTokenDto } from '@auth/dtos/reset-psw-token.dto';
import { UpdatePswDto } from '@auth/dtos/update-psw.dto';
import { TokensService } from '@auth/services/token.service';
import { User } from '@users/entities/users.entity';
import { UserRepository } from '@users/repositories/users.repository';
import { ResetPswDto } from '@auth/dtos/reset-psw.dto';
import { PageDto } from '@core/dtos/page.dto';
import { UserFilterDto } from '@users/dtos/user-filter.dto';
import { UsersResponse } from '@users/docs/users-response.doc';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { User as UserDoc } from '@users/docs/user.doc';
import { GenerateCredentialsDto } from '@users/dtos/generate-credentials.dto';
import * as generator from 'generate-password';
import { IEmail } from '@mails/interfaces/email.interface';
import { ConfigService } from '@nestjs/config';
import { MailsService } from '@mails/services/mails.service';
import { UpdateUserDto } from '@users/dtos/update-user.dto';
import { UserResponse } from '@users/docs/user-response.doc';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { RoleRepository } from '@auth/repositories/role.repository';
import { PermissionRepository } from '@auth/repositories/permission.repository';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
    private readonly mailsService: MailsService,
  ) {}

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

  async getAllUsers(pageDto: PageDto, userFilterDto: UserFilterDto): Promise<UsersResponse> {
    const [users, count] = await this.userRepository.getAllUsers(pageDto, userFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(UserDoc, users, { excludeExtraneousValues: true }), pagination };
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    const { roleIds, permissionIds, ...userDto } = createUserDto;
    const roles = roleIds ? await this.roleRepository.findRoles(roleIds) : [];
    const permissions = permissionIds ? await this.permissionRepository.findPermissions(permissionIds) : [];
    const user = await this.userRepository.save({ ...userDto, roles, permissions });
    return { data: plainToClass(UserDoc, user, { excludeExtraneousValues: true }) };
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    const user = await this.findByIdOrThrow(userId);
    const updatedUser = await this.userRepository.save({ ...user });
    return { data: plainToClass(UserDoc, updatedUser, { excludeExtraneousValues: true }) };
  }

  updatePsw(user: User, updatePswDto: UpdatePswDto): Promise<User> {
    if (!this.compareHash(updatePswDto.oldPassword, user.password)) {
      throw new BadRequestException('oldPassword: La contraseña es incorrecta');
    }
    const password = this.getHash(updatePswDto.newPassword);
    return this.userRepository.save({ ...user, password });
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

  async generateCredentials(generateCredentialsDto: GenerateCredentialsDto): Promise<void> {
    const { ids } = generateCredentialsDto;
    const from = this.configService.get<string>('EMAIL_USER');
    const templateId = this.configService.get<string>('GENERATE_CREDENTIALS_TEMPLATE_ID');
    const frontUrl = this.configService.get<string>('FRONT_URL');

    if (!(from && templateId && frontUrl)) {
      throw new InternalServerErrorException('Error en la configuración de Emails');
    }

    const users = await this.userRepository.find({
      where: {
        password: null,
        id: In(ids),
      },
    });

    if (!users.length) {
      return;
    }

    for (const user of users) {
      const random = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });
      const password = this.getHash(random);
      await this.userRepository.save({ ...user, active: true, password });

      const email: IEmail = {
        to: user.email,
        from,
        templateId,
        dynamicTemplateData: {
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          frontLogin: `${frontUrl}/login`,
          password: random,
        },
      };

      try {
        await this.mailsService.sendEmail(email);
      } catch (err) {
        Logger.error(err);
      }
    }
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.findByIdOrThrow(userId);
    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }
}
