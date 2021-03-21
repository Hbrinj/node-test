
## Notes
- Database credentials in a real scenario would be abstracted out of the component into a config file which would be pulled in etc.
- Money is stored as pennies, any value past the decimal point are fractions of pennies
- some improvements that could be made:
    - Cache the plans call if it isn't frequently updated
    - investigate if the calls to the DB are slow
    - Postgres has a Money type, but I was unable to utilise it via TypeORM (probably me not understanding)
    - Unsure what the preffered Exception chaining mechanism is for Js/Ts/Nest apps
    - Catch and generify server exceptions
    - E2E tests running via Docker
- Intentionally not tested the user endpoint
- Postman collection included to make things easier to hit
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Running the app via docker
note: for all of these scripts you will need to provide them with execute access, do this at your own risk, `chmod +x script_name_here.sh`. Alternatively if you're comfortable using docker-compose, thats available too.

```bash
# bring it up
$ ./bringup.sh

# tear it down
$ ./teardown.sh

# Complete wipe and reset + bringing it back up
$ ./cycle.sh
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
