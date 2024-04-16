import { User } from '@client-record/data-source/core/models/user.model';

export interface UserAuthenticateResult extends Omit<User, 'password'> {
  access_token: string;
  refresh_token: string;
}
