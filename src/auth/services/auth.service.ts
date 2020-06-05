import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { plainToClass } from 'class-transformer';
import { MailsService } from '@mails/services/mails.service';
import { UsersService } from '@users/services/users.service';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { TokenResponse } from '../docs/token-response.doc';
import { TokenRepository } from '../repositories/token.repository';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { Permission } from '../entities/permission.entity';
import { PoliticRepository } from '../repositories/politic.repository';
import { Politic } from '../docs/politic.doc';
import { PolitcDto } from '../dtos/politics.dto';
import { PoliticResponse } from '../docs/politic-response.doc';
import { Politic as PoliticEntity } from '../entities/politic.entity';
import { TokensService } from '../services/token.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
    private readonly tokenRepository: TokenRepository,
    private readonly politicRepository: PoliticRepository,
    private readonly mailsService: MailsService,
  ) {}

  async validateUser(username: string, password: string): Promise<IAuthenticatedUser | null> {
    const user = await this.usersService.findByUserName(username);
    if (user && this.usersService.compareHash(password, user.password)) {
      const userPermissions = [] as Array<Permission>;
      user.roles.forEach(rol => {
        userPermissions.push(...rol.permissions);
      });
      user.permissions.forEach(permission => userPermissions.push(permission));

      const permissionIds = userPermissions.map(permission => permission.id);
      const permissions = [...new Set(permissionIds)];
      const authenticatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        permissions,
      };
      return authenticatedUser;
    }
    return null;
  }

  async login(user: IAuthenticatedUser): Promise<TokenResponse> {
    const payload = { id: user.id, sub: user.username, email: user.email, permissions: user.permissions };
    const tokens = this.tokensService.getTokens(payload);
    const { accessToken, refreshToken, exp } = tokens.data;
    await this.tokenRepository.save({ user: { id: user.id }, accessToken, refreshToken, exp });
    return tokens;
  }

  async logout(accessToken: string) {
    const token = await this.tokenRepository.findOne({ where: { accessToken } });

    if (!token) {
      throw new UnauthorizedException('Token no encontrado en la Base de Datos');
    }
    await this.tokenRepository.remove(token);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<TokenResponse> {
    try {
      const refreshTokenSecret = this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN') || 'refresh';
      const oldRefreshToken = verify(refreshTokenDto.refreshToken, refreshTokenSecret) as ITokenPayload;

      const token = await this.tokenRepository.findOne({
        where: { refreshToken: refreshTokenDto.refreshToken },
        relations: ['user'],
      });
      if (!token) {
        throw Error;
      }
      const payload = {
        id: oldRefreshToken.id,
        sub: oldRefreshToken.sub,
        email: oldRefreshToken.email,
        permissions: oldRefreshToken.permissions,
      };
      const tokens = this.tokensService.getTokens(payload);

      const updatedToken = {
        ...token,
        ...tokens.data,
      };
      await this.tokenRepository.save(updatedToken);

      return tokens;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async forgotPsw(email: string): Promise<void> {
    const from = this.configService.get<string>('EMAIL_USER');
    const templateId = this.configService.get<string>('RESET_PSW_SENDGRID_TEMPLATE_ID');
    const frontUrl = this.configService.get<string>('FRONT_URL');
    if (!(from && templateId && frontUrl)) {
      throw new InternalServerErrorException('Error en la configuración de Emails');
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return;
    }
    const resetPasswordToken = this.tokensService.getPswToken(user.id);
    await this.usersService.updateUser(user, { resetPasswordToken });

    const emailToSend = {
      from,
      to: email,
      templateId,
      dynamicTemplateData: {
        name: user.name,
        url: `${frontUrl}/reset-psw?resetPasswordToken=${resetPasswordToken}`,
      },
    };
    try {
      await this.mailsService.sendEmail(emailToSend);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw new InternalServerErrorException('Error enviando el email');
    }
  }

  async getPolitics(idDto?: number): Promise<PoliticEntity> {
    const politic = await this.politicRepository.findOne(idDto || 1);
    if (!politic) {
      throw new NotFoundException(`Politica con id ${idDto} no encontrada`);
    }
    return politic;
  }

  async updatePolitic(idDto: number, politicDto: PolitcDto): Promise<PoliticResponse> {
    const politic = await this.getPolitics(idDto);

    const updatedPolitic = await this.politicRepository.save({
      ...politic,
      ...politicDto,
    });

    return { data: plainToClass(Politic, updatedPolitic, { excludeExtraneousValues: true }) };
  }
}
