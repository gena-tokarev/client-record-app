import { User } from '@client-record/user';
import { IsNotEmpty } from 'class-validator';

export class UserSignOutRequestDto {
  @IsNotEmpty()
  id: User['id'];
}