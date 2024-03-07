import { User } from '../../User/user.model';

export interface UserAuthenticateResult extends Omit<User, 'password'> {
  access_token: string;
  refresh_token: string;
}
