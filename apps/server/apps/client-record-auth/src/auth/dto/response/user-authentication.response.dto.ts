import { User } from '@client-record/data-source/core/models/user.model';

export type UserAuthenticationResponseDto = Pick<User, 'id' | 'username'>;
