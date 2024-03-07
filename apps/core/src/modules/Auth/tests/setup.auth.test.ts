import { Test } from '@nestjs/testing';
import {
  MockGlobalModules,
  MockGlobalProviders,
} from '../../../tests/global-metadata.mocks';
import { AuthModule } from '../auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../../User/user.module';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../User/user.model';

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
