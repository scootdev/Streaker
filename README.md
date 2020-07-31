# Streaker
An APP, that takes user input for goal (description) and dates, which marks it on the calendar.

During the APP operation, user input is stored in a database.

Checkboxes are used for marking the goal, and updates a goal tracker bar.

# Table of Contents

1. [User Story](#user-story)
2. [Technology Used](#technology-used)
3. [Essential Code](#essential-code)
4. [Future Development](#future-development)
5. [Heroku Deploy](#heroku-deploy)

## User Story

```
AS A student,

I WANT an APP to store my goals,

SO THAT I can track my success!

```

## Technology Used

Front-end:

1. HTML/CSS
2. Handlebars
3. Bootstrap
4. JavaScript/jQuery

Back-end:

1. MySQL Workbench
2. MySQL
3. Sequelize
4. Evo-Calendar package
5. Quotes API
6. ESLint
7. Travis
8. Heroku

![Login Page](./public/assets/loginpg.png)

![Calendar Page](./public/assets/calendarpg.png)

## Essential Code

- package.json file for dependencies used such as:
  - bcryptjs
  - Doting
  - Express
  - Express-handlebars
  - Express-session
  - jquery
  - mysql12
  - passport
  - passport-local
  - sequelize
- Node_modules folder to be ignored
- Views folder to hold the layouts, partials, and various handlebars
- package.json is crucial for displaying what the project has installed within it
- Followed with a series of scripts
- Boiler plates used
- passport.js file
- server.js
  - various requires and app.use
  - require appController route used here and app.use sessions
  - make sure to have the database syncing and logging a message to the user upon success
- Middlware routes/folder
- API specific routes
  - these will target and hit our desired routes
  - HTML routes for logged-in user
  - sending the user to sign-up page, log-out page, etc.
  - verification purposes
- db is to bring in the model files and use sequelize to bring them to the database
- Various models
- Static assets containing the public folder and front-end work
  - includes the essential files such index.js, signup.js, etc.
- Stylesheets
  - Styled to however one would like

## Future Development

- Analysis page to compare and track goals

- Additional date selection options

- Streaks for each goal!

- Choose between multiple theme colors

- User settings

- Accomplished short-term goals list

## Heroku Link

Deployed website can be found at [here](https://streaker-app.herokuapp.com/).
