import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { ConfigService } from '@nestjs/config';
import { PoliticRepository } from '../repositories/politic.repository';
import { TokenRepository } from '../repositories/token.repository';
import { NotFoundException } from '@nestjs/common';
import { Politic } from '../entities/politic.entity';

const mockPolitic = {
  id: 1,
};

const mockUpdatePoliticDto = {
  minLength: 10,
  capitalLetter: true,
  lowerCase: true,
  specialChart: false,
  numericChart: true,
  typeSpecial: ' {}[]-;,:?',
};

const mockUpdatedPoliticDto = {
  ...mockPolitic,
  ...mockUpdatePoliticDto,
};

const mockPoliticRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockUserService = () => ({});
const mockConfigService = () => ({});
const mockTokenRepository = () => ({});

describe('Auth Service', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let configService: ConfigService;
  let politicRepository: PoliticRepository;
  let tokenRepository: TokenRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useFactory: mockUserService },
        { provide: ConfigService, useFactory: mockConfigService },
        { provide: TokenRepository, useFactory: mockTokenRepository },
        { provide: PoliticRepository, useFactory: mockPoliticRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    configService = module.get<ConfigService>(ConfigService);
    tokenRepository = module.get<TokenRepository>(TokenRepository);
    politicRepository = module.get<PoliticRepository>(PoliticRepository);
  });
  it('Should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(configService).toBeDefined();
    expect(tokenRepository).toBeDefined();
    expect(politicRepository).toBeDefined();
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
