# Nocturne v2
Nocturne v2 will be powered by the following stack;

## Backend Stack
- Crystal REST / GraphQL API

## Frontend
- Vue.js
    - The Crystal Backend will do two things;
        - Provide an API to interact with models
        - Provide routing for the views
    - Everything else will be handled by Vue :D
- Bulma
    - Because doing my website from scratch by myself is proving a little too difficult to ever want to repeat it >.>

## Extras
- [crystal-community/jwt](https://github.com/crystal-community/jwt)
    - For generating JWTs to use for authentication
    - Will need some kind of way of saving this between requests (easiest way is in cookie or something)

