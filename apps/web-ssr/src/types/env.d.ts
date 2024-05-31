declare module "process" {
  declare global {
    declare namespace NodeJS {
      interface ProcessEnv {
        API_HOST: string;
        API_HOST_GRAPHQL_ROUTE: string;
        NEXT_APP_HOST: string;
        NEXT_APP_LOGIN_PATH: string;
        API_HOST_GRAPHQL_ROUTE_SUBSCRIPTIONS: string;
      }
    }
  }
}
