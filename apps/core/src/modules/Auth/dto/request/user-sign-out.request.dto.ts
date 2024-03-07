import { User } from '../../../User/user.model';
import { IsNotEmpty } from 'class-validator';

export class UserSignOutRequestDto {
  @IsNotEmpty()
  id: User['id'];
}
