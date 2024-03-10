import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { JwtAccessStrategy } from './auth-strategies/jwt-access.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from './auth-strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './auth-strategies/google.strategy';
import { JwtAccessFindUserStrategy } from './auth-strategies/jwt-access-find-user.strategy';
import { UserModule } from '@client-record/user';
// import { GraphqlJwtAccessGuard } from './guards/graphql-jwt-access.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PassportModule,
    JwtModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtAccessFindUserStrategy,
    // GraphqlJwtAccessGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService /*GraphqlJwtAccessGuard*/],
})
export class AuthModule {}
