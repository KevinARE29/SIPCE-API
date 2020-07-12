import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from '@auth/services/token.service';
import { UsersService } from '@users/services/users.service';
import { MailsService } from '@mails/services/mails.service';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';

jest.mock('bcrypt', () => ({
  ...jest.requireActual('bcrypt'),
  compareSync: () => true,
}));

const mockResetPswDto = {
  password: 'newPsw',
};

const mockUpdatePasswordDto = {
  oldPassword: 'oldPsw',
  newPassword: 'newPsw',
};

const mockResetPasswordDto = {
  resetPasswordToken: 'testToken',
};

const mockUser = {
  id: 1,
  username: 'testUser',
  resetPasswordToken: 'testToken',
};

const mockUpdatedUser = {
  ...mockUser,
  ...mockUpdatePasswordDto,
};

const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockTokensService = () => ({
  getPswTokenPayload: jest.fn(),
});

describe('Users Service', () => {
  let usersService: UsersService;
  let userReporitory: UserRepository;
  let tokensService: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: TokensService, useFactory: mockTokensService },
        { provide: MailsService, useValue: {} },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    usersService = module.get(UsersService);
    userReporitory = module.get(UserRepository);
    tokensService = module.get(TokensService);
  });

  it('Should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userReporitory).toBeDefined();
    expect(tokensService).toBeDefined();
  });

  describe('Update Password', () => {
    it('Should Update the password of a given user', async () => {
      (userReporitory.findOne as jest.Mock).mockResolvedValue(mockUser);
      (userReporitory.save as jest.Mock).mockResolvedValue(mockUpdatedUser);
      expect(userReporitory.save).not.toHaveBeenCalled();
      const result = await usersService.updatePsw(mockUser as User, mockUpdatePasswordDto);
      expect(userReporitory.save).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedUser);
    });
  });

  describe('Resert Password', () => {
    it('Should Resert the password of a given user', async () => {
      (userReporitory.findOne as jest.Mock).mockResolvedValue(mockUser);
      (userReporitory.save as jest.Mock).mockResolvedValue(mockUpdatedUser);
      (tokensService.getPswTokenPayload as jest.Mock).mockReturnValue({ id: 1 });
      expect(userReporitory.save).not.toHaveBeenCalled();
      await usersService.resetPsw(mockResetPasswordDto, mockResetPswDto);
      expect(userReporitory.save).toHaveBeenCalled();
    });
  });
});
