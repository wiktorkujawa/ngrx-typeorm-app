# CinemaManagerApp

MEAN Stack app with local(+nodemailer mails sent for verification) and google oauth20 authentication methods and CRUD methods with multer/gridfs uploads. Uses ngrx for state management.
## Description
App for managing Cinema Halls, repertoir and schedules.
  App written with Next.js(typescript boilerplate) and Typeorm withgraphql-apollo custom server(<b>express) with apollo-server-express andPostgresSQL database(Amazon RDS). Contains passport session authentication(local + google) with express-session to store session ID, nodemailer module to send activation email, type-graphql queries and mutations with connection to db migrations and entities created with Typeorm. Frontend created withchakra-ui components. Calendar component created with@devexpress/dx-react-scheduler andmaterial-ui. It also usesomdbApi movie database to add movies from database to Cinema repertoire. Queries and mutations hooks are generated withcodegen-graphql and state mangement is served withApollo Client.
### Usage
To run create .env file with following variables:
- mongoURI
- sessionSecret (express-session)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- APP_EMAIL (to configure nodemailer with google mail)
- APP_PASSWORD
- SUPPORT_EMAIL
- PAGE_NAME
```bash
# Build the project
yarn build
# Run the client & server with concurrently
yarn dev
# Watch live the server changes(typeorm+backend) compiled to jasvascript
yarn watch
# Run the Express server only
yarn server
# Run the client(Angular) only
ng serve --open

# Server runs on http://localhost:3000 and client on http://localhost:4200. Remember about adding .env files with needed keys and values in root folder. State management in angular is provided with .
# You can deploy it for example on heroku by connecting with github, eventually you can create build folder(dist) from root folder with: yarn build
# Example page: https://passport-angular.herokuapp.com/
```
