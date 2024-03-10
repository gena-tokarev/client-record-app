import { GoogleProfileRequestDto } from '../dto/request/google-profile.request.dto';

export type GoogleAuthenticationPayload = {
  profile: GoogleProfileRequestDto;
};
