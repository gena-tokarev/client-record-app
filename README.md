# Client record frontend and API monorepo
Powered by:
1. next.js/react.js
2. nest.js
3. graphql

## Run in dev mode
1. Make sure you have all the insfrastructure up and running (db, elasticsearch, replication etc.). Follow the instructions here: [Infrastructure README](https://github.com/gena-tokarev/client-record/README.md)
2. Create `.env` file and copy in it the contents of `.env.example`
3. Make sure you have `node.js` and `yarn` installed.
4. Run `yarn start:dev`.
5. Fill the db with test data: `yarn db:fill`. (Optional).

## Log in
You can either register a new user or use an existing one if you are running the project locally and have run `yarn db:fill`:
*Login:* `dev-user@example.com`
*Password:* `Dev-user-example-password$1`

#### NOTES:
Google OAuth will work only after you provide values for `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in the .env file.
