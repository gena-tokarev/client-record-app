import { TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { setupAuthTest } from '../tests/setup.auth.test';
import { User } from '@client-record/data-source/core/models/user.model';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    password: 'hashed_password',
    refresh_token: 'refresh_token',
  };

  beforeEach(async () => {
    const module: TestingModule = await setupAuthTest();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should validate a user and return the user object', async () => {
    jest.spyOn(authService, 'getUserByCredentials').mockResolvedValueOnce(mockUser);
    const result = await localStrategy.validate(
      mockUser.username,
      'test_password',
    );
    expect(result).toEqual(mockUser);
  });

  it('should throw an UnauthorizedException when user not found', async () => {
    jest.spyOn(authService, 'getUserByCredentials').mockResolvedValueOnce(null);
    await expect(
      localStrategy.validate(mockUser.username, 'test_password'),
    ).rejects.toThrow(UnauthorizedException);
  });
});
