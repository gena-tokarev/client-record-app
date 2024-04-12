import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignUpRequestDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
