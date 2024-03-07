import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './app.service';
// import { LocalStrategy } from './auth-strategies/local.strategy';
// import { JwtAccessStrategy } from './auth-strategies/jwt-access.strategy';
// import { AuthController } from './app.controller';
// import { JwtRefreshStrategy } from './auth-strategies/jwt-refresh.strategy';
// import { GoogleStrategy } from './auth-strategies/google.strategy';
// import { JwtAccessFindUserStrategy } from './auth-strategies/jwt-access-find-user.strategy';
import { AppController } from './app.controller';

@Module({
  // imports: [PassportModule, JwtModule],
  providers: [
    // AuthService,
    // LocalStrategy,
    // GoogleStrategy,
    // JwtAccessStrategy,
    // JwtRefreshStrategy,
    // JwtAccessFindUserStrategy,
  ],
  controllers: [AppController],
  // controllers: [AuthController],
  // exports: [AuthService],
})
export class AppModule {}
