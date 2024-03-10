import { TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { setupAuthTest } from './tests/setup.auth.test';
import { UserService } from '@client-record/user';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await setupAuthTest();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (bcrypt.hash as jest.Mock).mockImplementation(() => 'hashedPassword');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token and refresh_token', async () => {
      const user = new User();
      user.id = 1;
      user.username = 'testUser';

      jest.spyOn(jwtService, 'sign').mockReturnValue('testToken');
      jest
        .spyOn(userService, 'updateRefreshToken')
        .mockResolvedValue(undefined);

      const result = await authService.login(user);
      expect(result).toEqual({
        id: 1,
        username: 'testUser',
        access_token: 'testToken',
        refresh_token: 'testToken',
      });

      expect(jwtService.sign).toBeCalledTimes(2);
      expect(userService.updateRefreshToken).toBeCalledWith(
        user.id,
        'testToken',
      );
    });
  });

  describe('getUsersByCredentials', () => {
    it('should return user when credentials are valid', async () => {
      const user: User = {
        id: 1,
        username: 'test',
        password: 'hashedPassword',
        refreshToken: 'token',
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);

      const result = await authService.getUserByCredentials('test', 'password');

      expect(userService.findOne).toHaveBeenCalledWith('test');
      expect(bcrypt.compare).toHaveBeenCalledWith('password', user.password);
      expect(result).toEqual(user);
    });

    it('should return null when credentials are invalid', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const result = await authService.getUserByCredentials('test', 'password');

      expect(userService.findOne).toHaveBeenCalledWith('test');
      expect(result).toBeNull();
    });
  });

  describe('refreshAccessToken', () => {
    it('should generate a new access token with the given token payload', async () => {
      const tokenPayload = { username: 'test', sub: 1 };
      const access_token = 'access_token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(access_token);

      const result = await authService.refreshAccessToken(tokenPayload);

      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(result).toEqual(access_token);
    });
  });

  describe('register', () => {
    it('should register a user and return access_token, refresh_token, and id', async () => {
      const createUserDto: RegisterUserLocalStrategyDto = {
        username: 'testUser',
        password: 'testPassword',
      };

      jest.spyOn(jwtService, 'sign').mockReturnValue('testToken');
      jest.spyOn(userService, 'save').mockResolvedValue(1);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');

      const result = await authService.register(createUserDto);
      expect(result).toEqual({
        id: 1,
        username: 'testUser',
        access_token: 'testToken',
        refresh_token: 'testToken',
      });

      expect(jwtService.sign).toBeCalledTimes(2);
      expect(userService.save).toBeCalledWith({
        ...createUserDto,
        refreshToken: 'testToken',
        password: 'hashedPassword',
      });
      expect(bcrypt.hash).toBeCalledWith(createUserDto.password, 10);
    });
  });
});
