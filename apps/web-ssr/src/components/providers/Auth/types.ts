import { UserSignInRequestDto } from "@client-record/shared/src/schemas/user-sign-in.request.dto";
import { UserSignUpRequestDto } from "@client-record/shared/src/schemas/user-sign-up.request.dto";

export interface AuthContextValue {
  handleSignUp: (values: UserSignUpRequestDto) => void;
  handleLocal: (values: UserSignInRequestDto) => void;
  handleGoogle: () => void;
  logout: () => void;
  isLoading: boolean;
}
