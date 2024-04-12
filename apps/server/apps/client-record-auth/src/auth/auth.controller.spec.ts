import { TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterUserLocalStrategyDto } from './dto/request/user-sign-in.request.dto';
import { setupAuthTest } from './tests/setup.auth.test';
import { RefreshRequest } from './types/request-with-user.type';
import { User } from '@client-record/server/data-source/core/models/user.model';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await setupAuthTest();
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token and refresh token', async () => {
      const req = { user: { id: 1, email: 'test@example.com' } };
      const result = {
        id: 1,
        username: 'testUser',
        access_token: 'jwt_token',
        refresh_token: 'refresh_token',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(req)).toEqual(result);
    });
  });

  describe('refresh', () => {
    it('should return a new JWT token', async () => {
      const refreshToken = 'refresh_token';
      const accessToken = 'new_jwt_token';
      const result = { access_token: accessToken };
      const user: User = {
        id: 1,
        username: 'testUser',
        password: 'password',
        refreshToken: refreshToken,
      };

      jest
        .spyOn(authService, 'refreshAccessToken')
        .mockResolvedValue(accessToken);

      expect(await authController.refresh({ user } as RefreshRequest)).toEqual(
        result,
      );
    });
  });

  describe('register', () => {
    it('should create a new user and return refresh token, jwt token and user id', async () => {
      const createUserDto: RegisterUserLocalStrategyDto = {
        username: 'test@example.com',
        password: 'password',
      };
      const result = {
        id: 1,
        username: 'test@example.com',
        refresh_token: 'refresh_token',
        access_token: 'access_token',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(await authController.register(createUserDto)).toEqual(result);
    });
  });
});
