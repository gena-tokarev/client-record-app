import { User } from '../../User/user.model';

export interface UserSignInPayload extends Omit<User, 'password'> {}
