import { User } from '@client-record/server/data-source/core/models/user.model';

export type UserSignInPayload = Omit<User, 'password'>;
