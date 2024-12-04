# How to run?

1. You need node environment, node -v or install for example nvm
2. You need to fill .env with correct variables, the list is in .env.example
3. npm install
4. npm run start:dev for development, hot reload

All commands are in package.json

# How to run test?

1. npm install
2. npm run test

# Endpoints

Endpoints use cached Teamtailor repository, which also support rate limiting

- /candidates - return list of all candidates
- /candidates-csv - return CSV version of all candidates

This is based on Nest js framework, here is documentation
https://nestjs.com/
