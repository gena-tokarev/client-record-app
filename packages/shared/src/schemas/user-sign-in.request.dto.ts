import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserSignInRequestDto {
  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
