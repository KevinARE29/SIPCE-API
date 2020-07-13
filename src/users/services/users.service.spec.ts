import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from '@auth/services/token.service';
import { UsersService } from '@users/services/users.service';
import { MailsService } from '@mails/services/mails.service';
import { ConfigService } from '@nestjs/config';
import { mockPageDto } from '@core/constants/mock.constants';
import { RoleRepository } from '@auth/repositories/role.repository';
import { PermissionRepository } from '@auth/repositories/permission.repository';
import { UserRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';

jest.mock('bcrypt', () => ({
  ...jest.requireActual('bcrypt'),
  compareSync: () => true,
}));

const mockAllUsers = [[{ username: 'kescoto' }, { username: 'frivas' }], 2];

const allUsersResponse = {
  data: mockAllUsers[0],
  pagination: {
    totalPages: 1,
    perPage: mockPageDto.perPage,
    totalItems: mockAllUsers[1],
    page: mockPageDto.page,
    nextPage: undefined,
    previousPage: undefined,
  },
};

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
  getAllUsers: jest.fn().mockResolvedValue(mockAllUsers),
});

const mockTokensService = () => ({
  getPswTokenPayload: jest.fn(),
});

describe('Users Service', () => {
  let usersService: UsersService;
  let userRepository: UserRepository;
  let tokensService: TokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: TokensService, useFactory: mockTokensService },
        { provide: MailsService, useValue: {} },
        { provide: ConfigService, useValue: {} },
        { provide: RoleRepository, useValue: {} },
        { provide: PermissionRepository, useValue: {} },
      ],
    }).compile();

    usersService = module.get(UsersService);
    userRepository = module.get(UserRepository);
    tokensService = module.get(TokensService);
  });

  it('Should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(tokensService).toBeDefined();
  });

  describe('Get all users', () => {
    it('Should get all users', async () => {
      const result = await usersService.getAllUsers(mockPageDto, {});
      expect(result).toEqual(allUsersResponse);
    });
  });

  describe('Update Password', () => {
    it('Should Update the password of a given user', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      (userRepository.save as jest.Mock).mockResolvedValue(mockUpdatedUser);
      expect(userRepository.save).not.toHaveBeenCalled();
      const result = await usersService.updatePsw(mockUser as User, mockUpdatePasswordDto);
      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedUser);
    });
  });

  describe('Resert Password', () => {
    it('Should Resert the password of a given user', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      (userRepository.save as jest.Mock).mockResolvedValue(mockUpdatedUser);
      (tokensService.getPswTokenPayload as jest.Mock).mockReturnValue({ id: 1 });
      expect(userRepository.save).not.toHaveBeenCalled();
      await usersService.resetPsw(mockResetPasswordDto, mockResetPswDto);
      expect(userRepository.save).toHaveBeenCalled();
    });
  });

  describe('Delete User', () => {
    it('Should delete a specific user', async () => {
      (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
      await usersService.deleteUser(1);
      expect(userRepository.save).toBeCalled();
    });
  });
});
