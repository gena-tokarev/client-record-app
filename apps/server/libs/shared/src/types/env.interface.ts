export interface Env {
  API_GATEWAY_APP_PORT: string;

  AUTH_APP_PORT: string;
  AUTH_SERVICE_PORT: string;

  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION_TIME: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  SESSION_SECRET: string;
}
