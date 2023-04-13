# SSSF week 4+5 exercise. Submit to Oma

Add authentication and brute force prevention to last weeks assignment.

## Getting started

- Clone this repo
- create .env based on .env.example
  - it's assumed that graphql server is in port 3000, auth server is in port 3001 and upload server is in port 3002
  - the auth server and upload server done in the labs should work. Only change the field name in multer to 'cat'.
- `npm i` to install dependencies
- `npm run dev` to start development server
- `npm run test` to run tests

## Assignment

- Your task is to complete all TODOs in the code until all tests are passed
- TODOs are located in resolvers and app.ts

### Interfaces

- Interfaces are mostly the same as last week. The differnce is that now users have a role. This is because some operations need admin rights. The role should be embedded in the token.

### Database

- DB schemas are the same as last week

# Important

- Always empty your cats and users after tests.
