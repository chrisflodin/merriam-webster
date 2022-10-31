# Merriam Webster

A simple full stack application for demonstration purposes 💫

# Starting the application

### With Docker

1. Install [Docker](https://www.docker.com)
2. Clone repo
3. Run `docker-compose up`
4. Check out [http://localhost:3000](http://localhost:3000)

### Without Docker

1. Install [Node](https://nodejs.org/en/)
2. Clone repo
3. In frontend directory, run
   1. `npm install`
   2. `npm run dev`
4. In backend directory, run
   1. `npm install`
   2. `npm run dev`
5. Check out [http://localhost:3000](http://localhost:3000)

## Application Instructions

This simple application allows you to create and sign in as a user. It fetches some data from the merriam-webster API and displays it for you.

## Notes

- Currently, there are only tests for the backend. Frontend tests will be implemented _soon_.
- Run tests with `npm run test`
- Environment variables are exposed with sensitive information, normally this is **really bad,** but for this demonstrative project, there are no consequences with exposing secret keys etc.

# Used stack

### Frontend

- React (using TypeScript)
- react-query
- react-router-dom
- SASS & CSS-modules

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest
