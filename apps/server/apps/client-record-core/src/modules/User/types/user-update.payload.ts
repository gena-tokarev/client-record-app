export type UserUpdatePayload = {
  id: number;
  username?: string;
  password?: string | null;
  refresh_token?: string | null;
};
