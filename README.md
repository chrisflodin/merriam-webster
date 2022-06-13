# Chris Albscross Code Assignment

Hey!
I really enjoyed doing this assignment, feel free to reach out if you have any questions!

## Installation instructions

1. Clone the frontend and backend repos from GitHub
   - Frontend - https://github.com/ChrisFlodin/chris-frontend
   - Backend - https://github.com/ChrisFlodin/chris-backend
2. Install dependencies in both projects with "npm i"
3. Start each app respectively with "npm run dev"

## Notes

**Frontend**

- There are no tests in the projects as testing is something I have not worked with on previous projects, but will spend the next few weeks reading up on.
- The "Main" component does not take query parameters as an input for fetching data, but determines this itself and then causes the URL to update, whereas it should probably be the other way around. Not a problem for this use case but not typical either.
- React StricMode is a child of Router because of compatibility issue of react-router 5 and React, see stackoverflow issue 71832720. Chose not to spend time on fixing this.

**Backend**

- Did a slip when committing and accidentally ended up with two identical commits (May 31st).

## Suggestions of improvements / Things I didn't have time to do

**Frontend**

- Adding tests.
- Ordering imports and props, and making sure optional props are given a default value.
- Storing API_KEYS and other info in environment variables instead of a config file.
- The app stores the JWT in localStorage, which is not best practice because of security issues. Changing this would be necessary in a real-world app.
- Making the form's property "inputField" into maps instead of arrays.
- Updating the data-fetch API-call to use the same response object as the login and signup calls.
- Combining the SignIn and SignUp components as there is a lot of duplicate code.
- Figuring out how to destructure CSS modules directly from import.
