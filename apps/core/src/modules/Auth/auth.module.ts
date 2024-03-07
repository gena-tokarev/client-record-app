import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { JwtAccessStrategy } from './auth-strategies/jwt-access.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../User/user.module';
import { JwtRefreshStrategy } from './auth-strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './auth-strategies/google.strategy';
import { JwtAccessFindUserStrategy } from './auth-strategies/jwt-access-find-user.strategy';
import { GraphqlJwtAccessGuard } from './guards/graphql-jwt-access.guard';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtAccessFindUserStrategy,
    GraphqlJwtAccessGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService, GraphqlJwtAccessGuard],
})
export class AuthModule {}
