import { User } from '@client-record/user';

export type UserAuthenticationResponseDto = Pick<User, 'id' | 'username'>;
