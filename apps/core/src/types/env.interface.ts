export interface Env {
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION_TIME: string;
  // DB_USER: string;
  // DB_PASSWORD: string;
  // DB_PORT: number;
  // DB_HOST: string;
  APP_PORT: number;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  SESSION_SECRET: string;
}
