export interface Env {
  DB_HOST: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;

  NODE_ENV: string;
  API_GATEWAY_APP_PORT: string;

  AUTH_APP_PORT: number;
  AUTH_SERVICE_PORT: number;
  CORE_SERVICE_PORT: number;

  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRATION_TIME: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  SESSION_SECRET: string;

  ELASTICSEARCH_HOST: string;
  ELASTICSEARCH_PORT: number;
}
