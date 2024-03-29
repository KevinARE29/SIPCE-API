import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MailsService } from '@mails/services/mails.service';
import { UsersService } from '@users/services/users.service';
import { UserRepository } from '@users/repositories/users.repository';
import { AuthService } from '../services/auth.service';
import { PoliticRepository } from '../repositories/politic.repository';
import { TokenRepository } from '../repositories/token.repository';
import { TokensService } from './token.service';

const mockPolitic = {
  id: 1,
};

const mockUpdatePoliticDto = {
  minLength: 10,
  capitalLetter: true,
  lowerCase: true,
  specialChart: false,
  numericChart: true,
  typeSpecial: '{}[]-;,:?',
};

const mockUpdatedPoliticDto = {
  ...mockPolitic,
  ...mockUpdatePoliticDto,
};

const mockTokens = { accessToken: 'accessFake', refreshToken: 'refreshFake', exp: 'expFake' };

const mockPoliticRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockUserService = () => ({});
const mockConfigService = () => ({});
const mockMailsService = () => ({});
const mockTokenRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

const mockTokensService = () => ({
  getTokens: jest.fn().mockReturnValue({ data: mockTokens }),
});

describe('Auth Service', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let configService: ConfigService;
  let tokensService: TokensService;
  let politicRepository: PoliticRepository;
  let tokenRepository: TokenRepository;
  let mailsService: MailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useFactory: mockUserService },
        { provide: ConfigService, useFactory: mockConfigService },
        { provide: TokensService, useFactory: mockTokensService },
        { provide: TokenRepository, useFactory: mockTokenRepository },
        { provide: PoliticRepository, useFactory: mockPoliticRepository },
        { provide: MailsService, useFactory: mockMailsService },
        { provide: UserRepository, useValue: {} },
      ],
    }).compile();

    authService = module.get(AuthService);
    usersService = module.get(UsersService);
    configService = module.get(ConfigService);
    tokensService = module.get(TokensService);
    tokenRepository = module.get(TokenRepository);
    politicRepository = module.get(PoliticRepository);
    mailsService = module.get(MailsService);
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(configService).toBeDefined();
    expect(tokensService).toBeDefined();
    expect(tokenRepository).toBeDefined();
    expect(politicRepository).toBeDefined();
    expect(mailsService).toBeDefined();
  });

  describe('Login', () => {
    it('Should login an user', async () => {
      (tokenRepository.save as jest.Mock).mockResolvedValue(null);
      expect(tokenRepository.save).not.toHaveBeenCalled();
      const result = await authService.login({ id: 1, sub: 'user', email: 'user@email.com', permissions: [] });
      expect(result).toEqual({ data: mockTokens });
      expect(tokenRepository.save).toHaveBeenCalled();
    });
  });

  describe('Logout', () => {
    it('Should logout an user', async () => {
      (tokenRepository.findOne as jest.Mock).mockResolvedValue(mockTokens);
      const result = await authService.logout(mockTokens.accessToken);
      expect(result).toEqual(undefined);
    });
    it('Should throw an error when the token does not exist', async () => {
      (tokenRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(authService.logout(mockTokens.accessToken)).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('Get Politics', () => {
    it('Should Get a politic with id 1', async () => {
      (politicRepository.findOne as jest.Mock).mockResolvedValue(mockPolitic);
      expect(politicRepository.findOne).not.toHaveBeenCalled();
      const result = await authService.getPolitics(1);
      expect(result).toEqual(mockPolitic);
      expect(politicRepository.findOne).toHaveBeenCalledWith(1);
    });
    it('Should throw an error when the politic does not exist', async () => {
      (politicRepository.findOne as jest.Mock).mockResolvedValue(null);
      expect(authService.getPolitics(0)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('Update Politic', () => {
    it('Should Update a new Politic', async () => {
      (politicRepository.findOne as jest.Mock).mockResolvedValue(mockPolitic);
      (politicRepository.save as jest.Mock).mockResolvedValue(mockUpdatedPoliticDto);
      expect(politicRepository.save).not.toHaveBeenCalled();
      const result = await authService.updatePolitic(1, mockUpdatePoliticDto);
      expect(politicRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ data: mockUpdatedPoliticDto });
    });
  });
});
