import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserCreatePayload } from './types/user-create.payload';
import { UserUpdatePayload } from './types/user-update.payload';
import { UserUpdateRefreshTokenPayload } from './types/user-update-refresh-token.payload';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('find_user_by_username')
  findUserByUsername(username: string) {
    return this.userService.findByUsername(username);
  }

  @MessagePattern('create_user')
  saveUser(data: UserCreatePayload) {
    return this.userService.create(data);
  }

  @MessagePattern('update_user')
  updateUser(data: UserUpdatePayload) {
    return this.userService.update(data);
  }

  @MessagePattern('update_refresh_token')
  updateRefreshToken(payload: UserUpdateRefreshTokenPayload) {
    return this.userService.updateRefreshToken(payload);
  }
}
