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
        API_HOST: "http://localhost:4000",
        NEXT_APP_HOST: "http://localhost:3000",
        NEXT_APP_LOGIN_PATH: "/login",
    },
};

export default nextConfig;
