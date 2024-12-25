import { UserSignUpRequestDto } from "@client-record/shared/src/modules/user/dto/user-sign-up.request.dto";
import { UserSignInRequestDto } from "@client-record/shared/src/modules/user/dto/user-sign-in.request.dto";

export interface AuthContextValue {
  handleSignUp: (values: UserSignUpRequestDto) => void;
  handleLocal: (values: UserSignInRequestDto) => void;
  handleGoogle: () => void;
  logout: () => void;
  isLoading: boolean;
}
