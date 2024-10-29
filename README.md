# Client record
Client Record application monorepo
powered by:
1. next.js/react.js
2. nest.js
3. graphql
4. postgreSQL

## Run in dev mode

### General steps
- Create `.env` file and copy in it the contents of `.env.example`

### Local development
1. Change the `DB_HOST` env variable value to `DB_HOST=localhost`
2. Make sure you have `docker`, `node.js` and `yarn` installed.
3. Run `docker-compose up db`.
4. Run `yarn start:dev`.
5. Fill the db with test data: `yarn db:fill`. (Optional).

### Docker development (Quick demo)
1. Change the `DB_HOST` env variable value to `DB_HOST=db`
2. Make sure you have `docker` installed.
3. Run `docker-compose up --build`.

## Log in
You can either register a new user or use an existing one if you ran the project locally and ran `yarn db:fill`:

*Login:* `dev-user@example.com`
*Password:* `Dev-user-example-password$1`

#### NOTES:
Google OAuth will work only after you provide values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
