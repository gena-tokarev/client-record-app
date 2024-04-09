import { User } from '@client-record/data-source/core/models/user.model';
import { IsNotEmpty } from 'class-validator';

export class UserSignOutRequestDto {
  @IsNotEmpty()
  id: User['id'];
}
