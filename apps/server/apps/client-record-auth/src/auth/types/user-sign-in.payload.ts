import { User } from '@client-record/data-source/core/models/user.model';

export type UserSignInPayload = Omit<User, 'password'>;
