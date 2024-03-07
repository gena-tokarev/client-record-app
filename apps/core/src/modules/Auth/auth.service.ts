import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Env } from '../../types/env.interface';
import { UserService } from '../User/user.service';
import { TokenPayload } from './types/token.payload';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash';
import { UserAuthenticateResult } from './types/user-authenticate.result';
import { UserSignUpPayload } from './types/user-sign-up.payload';
import { UserSignInPayload } from './types/user-sign-in.payload';
import { User } from '../User/user.model';
import { UserAuthenticatePayload } from './types/user-authenticate.payload';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<Env>,
    private userService: UserService,
  ) {}

  private generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
    });
  }

  private generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
    });
  }

  private generateUserTokens(payload: TokenPayload) {
    const access_token = this.generateAccessToken(payload);
    const refresh_token = this.generateRefreshToken(payload);

    return {
      access_token,
      refresh_token,
    };
  }

  public async refreshAuthentication(
    userPayload: User,
  ): Promise<UserAuthenticateResult> {
    const tokens = this.generateUserTokens({
      username: userPayload.username,
      sub: userPayload.id,
    });

    const user = await this.userService.update({
      id: userPayload.id,
      refresh_token: tokens.refresh_token,
    });

    return {
      ...user,
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
    };
  }

  public async signOut(token: string) {
    const secret = this.configService.get<string>('JWT_SECRET');
    const payload = this.jwtService.verify(token, { secret }) as User;
    if (payload.refresh_token) {
      await this.userService.update({
        id: payload.id,
        refresh_token: null,
      });
    }
  }

  // SignIn or SignUp
  public async authenticate(
    userPayload: UserAuthenticatePayload,
  ): Promise<UserAuthenticateResult> {
    const { username } = userPayload;
    const user = await this.userService.findByUsername(username);

    if (user) {
      const userSingInPayload: UserSignInPayload = omit(user, 'password');
      return this.signIn(userSingInPayload);
    } else {
      const userSingUpPayload: UserSignUpPayload = { username };
      return this.signUp(userSingUpPayload);
    }
  }

  public async signIn(
    userPayload: UserSignInPayload,
  ): Promise<UserAuthenticateResult> {
    const tokens = this.generateUserTokens({
      username: userPayload.username,
      sub: userPayload.id,
    });

    await this.userService.updateRefreshToken(
      userPayload.id,
      tokens.refresh_token,
    );

    return {
      ...userPayload,
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
    };
  }

  public async signUp(
    userPayload: UserSignUpPayload,
  ): Promise<UserAuthenticateResult> {
    const tokens = this.generateUserTokens({
      username: userPayload.username,
      sub: uuidv4(),
    });

    const user = await this.userService.create({
      ...userPayload,
      refresh_token: tokens.refresh_token,
      password: userPayload.password
        ? await bcrypt.hash(userPayload.password, 10)
        : undefined,
    });

    return {
      ...omit(user, 'password'),
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
    };
  }

  public isValidPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
