import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users/services/users.service';
import { UserRepository } from '../repositories/users.repository';

const mockUpdatePasswordDto = {
  password: 'testPassword',
};

const mockUser = {
  id: 1,
  username: 'testUser',
};

const mockUpdatedUser = {
  ...mockUser,
  ...mockUpdatePasswordDto,
};

const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

describe('Users Service', () => {
  let usersService: UsersService;
  let userReporitory: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: UserRepository, useFactory: mockUserRepository }],
    }).compile();

    usersService = module.get(UsersService);
    userReporitory = module.get(UserRepository);
  });
  it('Should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userReporitory).toBeDefined();
  });

  describe('Update Password', () => {
    it('Should Update the password of a given user', async () => {
      (userReporitory.findOne as jest.Mock).mockResolvedValue(mockUser);
      (userReporitory.save as jest.Mock).mockResolvedValue(mockUpdatedUser);
      expect(userReporitory.save).not.toHaveBeenCalled();
      const result = await usersService.updatePsw(1, mockUpdatePasswordDto.password);
      expect(userReporitory.save).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
