import { Test } from '@nestjs/testing';

import { AuthModule } from '../auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockGlobalModules,
  MockGlobalProviders,
} from '../../tests/global-metadata.mocks';
import { User, UserModule } from '@client-record/user';

export const setupAuthTest = () =>
  Test.createTestingModule({
    imports: [
      ...MockGlobalModules,
      AuthModule,
      PassportModule,
      JwtModule,
      UserModule,
    ],
    controllers: [AuthController],
    providers: [...MockGlobalProviders, AuthService],
  })
    .overrideProvider('UserService')
    .useValue({
      findById: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      updateRefreshToken: jest.fn(),
    })
    .overrideProvider(getRepositoryToken(User))
    .useValue({
      findOne: jest.fn(),
      save: jest.fn(),
    })
    .compile();
