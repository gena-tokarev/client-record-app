import * as dotenv from "dotenv";
dotenv.config({ path: ["../../.env.development"] });

console.log(process.env)

const API_HOST_BASE_URL = `${process.env.API_GATEWAY_BASE_URL}:${process.env.API_GATEWAY_APP_PORT}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/appointment/list",
        permanent: true,
      },
    ];
  },
  env: {
    API_HOST: API_HOST_BASE_URL,
    API_HOST_GRAPHQL_ROUTE: `${API_HOST_BASE_URL}${process.env.API_GATEWAY_API_ROUTE}`,
    API_HOST_GRAPHQL_ROUTE_SUBSCRIPTIONS: `ws://localhost:4002/graphql`,
    NEXT_APP_HOST: `http://localhost:${process.env.WEB_PORT}`,
    NEXT_APP_LOGIN_PATH: process.env.NEXT_APP_LOGIN_PATH,
  },
};

export default nextConfig;
