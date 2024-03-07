export type TokenPayload = {
  username: string;
  sub: number;
} & Record<string, string | number>;
