import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  Req,
  Get,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthDuplicatedEmailErrorInterceptor } from './interceptors/duplicated-email-error.interceptor';
import { StrategyNamesEnum } from './enums/strategy-names.enum';
import { Request, Response } from 'express';
import { UserSignUpRequestDto } from './dto/request/user-sign-up.request.dto';
import { setAuthTokenCookiesHelper } from './helpers/set-auth-token-cookies.helper';
import { omit } from 'lodash';
import { GoogleAuthenticationPayload } from './types/google-authentication.payload.dto';
import { unsetAuthTokenCookiesHelper } from './helpers/unset-auth-token-cookies.helper';
import { DtoValidationGuard } from '@client-record/shared/guards/dto-validation.guard';
import { TokenNamesEnum } from './types/token-names.enum';
import { ErrorMessagesEnum } from '@client-record/shared/enums/error-messages.enum';
import { User } from '@client-record/user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(
    DtoValidationGuard(UserSignUpRequestDto),
    AuthGuard(StrategyNamesEnum.LOCAL),
  )
  async signIn(
    @Req() req: Request & { user: User },
    @Res() res: Response,
  ): Promise<void> {
    const { refresh_token, access_token, ...restResult } =
      await this.authService.signIn(omit(req.user, 'password'));
    setAuthTokenCookiesHelper(res, TokenNamesEnum.REFRESH, refresh_token);
    setAuthTokenCookiesHelper(res, TokenNamesEnum.ACCESS, access_token);
    res.status(200).json({ ...restResult });
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    unsetAuthTokenCookiesHelper(res, TokenNamesEnum.REFRESH);
    unsetAuthTokenCookiesHelper(res, TokenNamesEnum.ACCESS);

    const authHeader = req.headers.authorization;

    if (authHeader) {
      const [bearer, token] = authHeader.split(' ');

      if (bearer === 'Bearer' && token) {
        try {
          await this.authService.signOut(token);
        } catch (err) {
          console.error('Invalid JWT provided', err);
        }
      }
    }

    res.status(200).json(null);
  }

  @Post('register')
  @UseInterceptors(AuthDuplicatedEmailErrorInterceptor)
  async signUp(
    @Body()
    requestDto: UserSignUpRequestDto,
    @Res() res,
  ): Promise<void> {
    const { access_token, refresh_token, ...restResult } =
      await this.authService.signUp(requestDto);
    setAuthTokenCookiesHelper(res, TokenNamesEnum.REFRESH, refresh_token);
    setAuthTokenCookiesHelper(res, TokenNamesEnum.ACCESS, access_token);
    res.status(200).json(restResult);
  }

  @Get('google')
  @UseGuards(AuthGuard(StrategyNamesEnum.GOOGLE_OAUTH20))
  async googleLogin() {
    // Implemented in the guard
  }

  @Get('google/callback')
  @UseGuards(AuthGuard(StrategyNamesEnum.GOOGLE_OAUTH20))
  async googleLoginCallback(
    @Req() req: Request & { user: GoogleAuthenticationPayload },
    @Res() res: Response,
  ) {
    const { profile } = req.user;
    const username = profile.emails[0].value;
    const { refresh_token, access_token } = await this.authService.authenticate(
      { username },
    );
    setAuthTokenCookiesHelper(res, TokenNamesEnum.REFRESH, refresh_token);
    setAuthTokenCookiesHelper(res, TokenNamesEnum.ACCESS, access_token);
    if (typeof req.session.callbackUrl === 'string') {
      res.redirect(decodeURIComponent(req.session.callbackUrl));
    }
    throw new UnauthorizedException(ErrorMessagesEnum.NO_REDIRECT_URL);
  }

  @Post('refresh')
  @UseGuards(AuthGuard(StrategyNamesEnum.JWT_REFRESH))
  async refresh(@Req() req: Request & { user: User }, @Res() res: Response) {
    const { access_token } = await this.authService.refreshAuthentication(
      req.user,
    );
    setAuthTokenCookiesHelper(res, TokenNamesEnum.ACCESS, access_token);
    res.status(200).json({ access_token });
  }

  @UseGuards(AuthGuard(StrategyNamesEnum.JWT_ACCESS))
  @Get('test')
  test() {
    return { test: 1 };
  }

  @Get('providers')
  providers() {
    return {};
  }
}
