import { Match } from "@/validation/class-validator/decorators/match.decorator";
import { UserSignUpRequestDto } from "@client-record/shared/src/schemas/user-sign-up.request.dto";
import { IsNotEmpty } from "class-validator";

export class SignUpValidator extends UserSignUpRequestDto {
  @IsNotEmpty()
  @Match("password", { message: "Passwords do not match" })
  confirmPassword: string = "";
}
