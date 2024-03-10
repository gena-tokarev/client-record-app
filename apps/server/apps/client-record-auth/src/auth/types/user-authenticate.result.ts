import { User } from '@client-record/user';

export interface UserAuthenticateResult extends Omit<User, 'password'> {
  access_token: string;
  refresh_token: string;
}
