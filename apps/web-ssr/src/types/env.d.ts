declare module "process" {
  declare global {
    declare namespace NodeJS {
      interface ProcessEnv {
        API_HOST: string;
        NEXT_APP_HOST: string;
        NEXT_APP_LOGIN_PATH: string;
        OAUTH_REDIRECT_URL: string;
      }
    }
  }
}
