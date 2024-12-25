# Client record
Client Record application monorepo
powered by:
1. next.js/react.js
2. nest.js
3. graphql
4. postgreSQL
5. Golang

## Run in dev mode
1. Create `.env` file and copy there the contents of `.env.example`
2. Make sure you have `docker`, `node.js` and `yarn` installed.
3. Run `docker-compose up`.
4. Run `yarn start:dev`.
5. Fill the db with test data: `yarn db:fill`. (Optional).

## Log in
You can either register a new user or use an existing one if you are running the project locally and have run `yarn db:fill`:
*Login:* `dev-user@example.com`
*Password:* `Dev-user-example-password$1`

#### NOTES:
Google OAuth will work only after you provide values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
