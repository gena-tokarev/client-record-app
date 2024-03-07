import { User } from '../../../User/user.model';

export type UserAuthenticationResponseDto = Pick<User, 'id' | 'username'>;
