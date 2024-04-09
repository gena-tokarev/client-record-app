import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserCreatePayload } from './types/user-create.payload';
import { UserUpdatePayload } from './types/user-update.payload';
import { ErrorMessagesEnum } from '@client-record/shared/enums/error-messages.enum';
import { ErrorNamesEnum } from '@client-record/shared/enums/error-names.enum';
import { GenericError } from '@client-record/shared/errors/GenericError';
import { UserUpdateRefreshTokenPayload } from './types/user-update-refresh-token.payload';
import { User } from '@client-record/data-source/core/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateRefreshToken(payload: UserUpdateRefreshTokenPayload) {
    const { id, refresh_token } = payload;
    const user = await this.findById(id);
    if (user) {
      return await this.userRepository.save({ ...user, refresh_token });
    }
    return null;
  }

  async create(user: UserCreatePayload): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code === '23505'
      ) {
        throw new GenericError(
          ErrorNamesEnum.DUPLICATED_EMAIL,
          ErrorMessagesEnum.DUPLICATED_EMAIL,
        );
      }

      throw error;
    }
  }

  async update(user: UserUpdatePayload): Promise<User> {
    return await this.userRepository.save(user);
  }
}
