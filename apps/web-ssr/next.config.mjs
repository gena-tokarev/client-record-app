import * as dotenv from "dotenv";
dotenv.config({ path: ["../../.env", ".env"] });

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
    API_HOST: `http://localhost:${process.env.API_GATEWAY_APP_PORT}`,
    NEXT_APP_HOST: `http://localhost:${process.env.WEB_PORT}`,
    NEXT_APP_LOGIN_PATH: "/login",
  },
};

export default nextConfig;
