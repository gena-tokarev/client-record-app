import { User } from '@client-record/user';

export type UserSignInPayload = Omit<User, 'password'>;
