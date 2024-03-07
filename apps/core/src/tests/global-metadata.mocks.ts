import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const MockGlobalModules = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
];

export const MockGlobalProviders = [
  {
    provide: ConfigService,
    useValue: {
      get: jest.fn((key) => {
        switch (key) {
          case 'JWT_SECRET':
            return 'test-jwt-secret';
          case 'JWT_EXPIRATION_TIME':
            return '1h';
          case 'REFRESH_TOKEN_SECRET':
            return 'test-refresh-token-secret';
          case 'REFRESH_TOKEN_EXPIRATION_TIME':
            return '7d';
          default:
            return null;
        }
      }),
    },
  },
];
