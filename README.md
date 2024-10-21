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
DB_NAME = gasheck
DB_USER = gasheck
DB_PASSWORD = Rosicky07
DB_PORT = 5432
DB_HOST = db
WEB_PORT=3000
API_GATEWAY_APP_PORT=4000
API_GATEWAY_BASE_URL = 'http://localhost'
API_GATEWAY_API_ROUTE = '/api/graphql'

JWT_SECRET=21341234g:!o9d9-=d!2HJJJJJJJ.8883*dsdjfk1234FDF5G0)002-=244$23oYTR%ndvs6Bcds
JWT_EXPIRATION_TIME=1h
REFRESH_TOKEN_SECRET=assdfg721341234:u2938jfJHG7wnJ3hf:23m-=23jKHJi723enHJgvt23uyLKLJFy&*YFo;
REFRESH_TOKEN_EXPIRATION_TIME=1h
 
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
SESSION_SECRET=dfaslkd1242315234*&DHLdfsy6HJGbkld

AUTH_APP_PORT=4001
CORE_APP_PORT=4002

AUTH_SERVICE_PORT=4101
CORE_SERVICE_PORT=4102

# WEB
NEXT_APP_LOGIN_PATH = '/auth'
```

#### NOTES:
Google OAuth will work after you've provided values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### Local development
1. Make sure you have `docker`, `node.js` and `yarn` installed.
3. Run `docker-compose --env-file .env.development db up`.
4. Fill the db with test data: `yarn db:fill`. (Optional).
5. Run `yarn start:dev`.

### Development in docker (for a quick demo)
1. Make sure you have `docker` installed.
2. Run `docker-compose --env-file .env.development up`.
