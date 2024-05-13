import * as dotenv from "dotenv";
dotenv.config({ path: ["../../.env", ".env"] });

const API_HOST_BASE_URL = `${process.env.API_GATEWAY_BASE_URL}:${process.env.API_GATEWAY_APP_PORT}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/appointments",
        permanent: true,
      },
    ];
  },
  env: {
    API_HOST: API_HOST_BASE_URL,
    API_HOST_GRAPHQL_ROUTE: `${API_HOST_BASE_URL}${process.env.API_GATEWAY_API_ROUTE}`,
    NEXT_APP_HOST: `http://localhost:${process.env.WEB_PORT}`,
    NEXT_APP_LOGIN_PATH: process.env.NEXT_APP_LOGIN_PATH,
  },
};

export default nextConfig;
