import { User } from '@client-record/server/data-source/core/models/user.model';

export type UserAuthenticationResponseDto = Pick<User, 'id' | 'username'>;
