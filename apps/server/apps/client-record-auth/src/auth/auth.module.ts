import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { JwtAccessStrategy } from './auth-strategies/jwt-access.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from './auth-strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './auth-strategies/google.strategy';
import { JwtAccessFindUserStrategy } from './auth-strategies/jwt-access-find-user.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@client-record/config/config.module';
import { ConfigService } from '@nestjs/config';
// import { GraphqlJwtAccessGuard } from './guards/graphql-jwt-access.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule,
    ClientsModule.registerAsync([
      {
        name: 'CORE_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: configService.get('CORE_SERVICE_PORT', 4000),
          },
        }),
      },
    ]),
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
