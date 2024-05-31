import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { GoogleProfileRequestDto } from '../dto/request/google-profile.request.dto';
import { GoogleAuthenticationPayload } from '../types/google-authentication.payload.dto';
import { Env } from '@client-record/server-shared/types/env.interface';
import { StrategyNamesEnum } from '../enums/strategy-names.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  StrategyNamesEnum.GOOGLE_OAUTH20,
) {
  constructor(configService: ConfigService<Env>) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      state: true,
    });
  }

  async authenticate(req: any, options) {
    if (typeof req.query.frontend_redirect_uri === 'string') {
      req.session.callbackUrl = req.query.frontend_redirect_uri;
    }
    super.authenticate(req, { ...options, prompt: 'select_account' });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfileRequestDto,
  ): GoogleAuthenticationPayload {
    return {
      profile,
    };
  }
}
