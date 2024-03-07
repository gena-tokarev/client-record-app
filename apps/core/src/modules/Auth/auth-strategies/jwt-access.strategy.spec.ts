import { TestingModule } from '@nestjs/testing';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { setupAuthTest } from '../tests/setup.auth.test';
import { UserService } from '../../User/user.service';
import { User } from '../../User/user.model';

describe('JwtAccessStrategy', () => {
  let jwtStrategy: JwtAccessStrategy;
  let userService: UserService;
  let configService: ConfigService;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    password: 'hashed_password',
    refreshToken: 'refresh_token',
  };

  beforeEach(async () => {
    const module: TestingModule = await setupAuthTest();

    jwtStrategy = module.get<JwtAccessStrategy>(JwtAccessStrategy);
    userService = module.get<UserService>(UserService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
    expect(userService).toBeDefined();
    expect(configService).toBeDefined();
  });

  it('should validate a user and return the user object', async () => {
    jest.spyOn(userService, 'findById').mockResolvedValueOnce(mockUser);
    const payload = { sub: mockUser.id, username: mockUser.username };
    const result = await jwtStrategy.validate(payload);
    expect(result).toEqual(mockUser);
  });

  it('should throw an UnauthorizedException when user not found', async () => {
    jest.spyOn(userService, 'findById').mockResolvedValueOnce(null);
    const payload = { sub: mockUser.id, username: mockUser.username };
    await expect(jwtStrategy.validate(payload)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
