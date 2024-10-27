# Client record
Client Record application monorepo
powered by:
1. next.js/react.js
2. nest.js
3. graphql
4. postgreSQL

## Run in dev mode
Create file `env.development` in the project root directory and put these vars in it:
```
# SERVER AND DOCKER
DB_NAME = client-record-dev
DB_USER = client-record
DB_PASSWORD = dev-very-complex-password
DB_PORT = 5432
DB_HOST = db
WEB_PORT=3000
API_GATEWAY_APP_PORT=4000
API_GATEWAY_BASE_URL = 'http://localhost'
API_GATEWAY_API_ROUTE = '/api/graphql'

JWT_SECRET=dev_jwt_secret
JWT_EXPIRATION_TIME=1h
REFRESH_TOKEN_SECRET=dev_refresh_token_secret
REFRESH_TOKEN_EXPIRATION_TIME=1h
 
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
SESSION_SECRET=dev_session_secret

AUTH_APP_PORT=4001
CORE_APP_PORT=4002

AUTH_SERVICE_PORT=4101
CORE_SERVICE_PORT=4102

# WEB
NEXT_APP_LOGIN_PATH = '/auth'
```

#### NOTES:
Google OAuth will work only after you provide values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### Local development
1. Make sure you have `docker`, `node.js` and `yarn` installed.
2. Create `.env` file and copy there the contents of `.env.example`
3. Run `docker-compose up db`.
4. Run `yarn start:dev`.
5. Fill the db with test data: `yarn db:fill`. (Optional).

### Development in docker (for a quick demo)
1. Make sure you have `docker` installed.
2. Create `.env` file and copy there the contents of `.env.example-docker`
3. Run `docker-compose up --build`.
