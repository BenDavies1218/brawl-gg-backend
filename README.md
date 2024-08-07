# brawl-gg-backend

## JWT AUTHORIZATIONS

### USER JWT

    Created when the user logins into the web app. refreshed on every route hit by the user. has an expire of 30mins.
    decodedData : {
        userId: "mongoose OBJECT",
        username: "string",
        password: "string",
        isAdmin: boolean
    }

### JOIN GAME JWT

    Created when a user creates a tournament and saved to the data base, is never refreshed. no expiry time.
    decodedData : {
        torunamentId: "mongoose OBJECT",
        password: "string",
    }

## Routes

### Signup

    Endpoint name : new user signup
    Request type: POST
    address: https://brawl-gg-backend.onrender.com/signup
    Authorization header required: None required
    Sample JSON:
    {
    "username": "username",
    "email": "ben@email.com.au",
    "password": "Coderacademy1!",
    }
    Exspected response data = {successful account creation message}
    -------------------------------------------------------------------------

### Login

    Endpoint name : User Login
    Request type: POST
    address: https://brawl-gg-backend.onrender.com/login
    Authorization header required: None required
    Sample JSON:
    {
    "email": "ben@email.com.au",
    "password": "Coderacademy1!",
    }

    Exspected response data = {username, JWT}

    -------------------------------------------------------------------------

    Endpoint name : User Check email for password to be reset
    Request type: POST
    address: https://brawl-gg-backend.onrender.com/login/forgot-password
    Authorization header required: None required
    Sample JSON:
    {
    "email": "ben@email.com.au"
    }

    Exspected response data = {recoveryID}

    -------------------------------------------------------------------------

    Endpoint name : Check users recovery passcode
    Request type: POST
    address: https://brawl-gg-backend.onrender.com/login/check-recovery-code
    Authorization header required: None required
    Sample JSON:
    {
    "recoveryId": "Mongoose Object ID",
    "passcode": "123456",
    }

    Exspected response data = {Suceesfully verification of passcode}

    -------------------------------------------------------------------------

    Endpoint name : Set new password for the user
    Request type: POST
    address: https://brawl-gg-backend.onrender.com/login/new-password
    Authorization header required: None required
    Sample JSON:
    {
    "email": "ben@email.com.au",
    "recoveryId": "Mongoose Object ID",
    "passcode": "123456",
    "newPassword": "A1Coder!"
    }

    Exspected response data = {successful user password changed}

    -------------------------------------------------------------------------

### User

    Endpoint name : Get User Dashboard
    Request Type: GET
    address: https://brawl-gg-backend.onrender.com/user/dashboard
    Authorization required: any JWT Authurization
    No Body JSON required
    successful response = {message, jwt, username, email, [yourTournaments]}. Admin JWT users also get extra data {Total users, Total tournaments, totalUserInTournaments}

    ------------------------------------------------------------------------

    Endpoint name : Get All Users
    Request Type: GET
    address: https://brawl-gg-backend.onrender.com/user/all
    Authorization required: Admin user JWT Authurization
    successful response = all user documents (This is an Admin Route)

    ------------------------------------------------------------------------

    Endpoint name : Get One User By Email
    Request Type: GET
    address:
    https://brawl-gg-backend.onrender.com/user/:email
    Authorization header required: JWT Created by User
    successful response = One user document that with matching email (This is an Admin Route)


    -------------------------------------------------------------------------


    Endpoint name : Update User
    Request type: PATCH
    address: https://brawl-gg-backend.onrender.com/user
    Authorization required: JWT Created by User
    Sample JSON:
    {
    "name": "Jimmy",
    "email": "jimmy@email.com.au",
    "password": "Coderacademy1!",
    "profile picture": "image",
    }
    Successful Response = {
        message: "User updated successfully",
        jwt: JWT,
      }
    Optional inputs = ["name", "email", "password", "profile picture"]

    ----------------------------------------------------------------------

    Endpoint name : Delete User
    Request type: Delete
    address:
    https://brawl-gg-backend.onrender.com/user
    Authorization required: JWT Created by User
    Successful Response = { message: "User deleted successfully" }

### Tournaments

    Endpoint name : Get All Torunaments
    Request Type: GET
    address: https://brawl-gg-backend.onrender.com/tournament/all
    Authorization required: Admin user JWT Authurization

    ------------------------------------------------------------------------

    Endpoint name : Get All tournaments by one user
    Request Type: GET
    address:
    https://brawl-gg-backend.onrender.com/all/:id
    Authorization header required: JWT Created by User


    -------------------------------------------------------------------------

    Endpoint name : Get One tournament
    Request Type: GET
    address:
    https://brawl-gg-backend.onrender.com/tournament/:id
    Authorization header required: JWT Created by User


    -------------------------------------------------------------------------

    Endpoint name : Join a tournament
    Request type: GET
    address: https://brawl-gg-backend.onrender.com/tournament/join/:token
    Authorization header required: Password and tournament id verification JWT

    -------------------------------------------------------------------------

    Endpoint name : Create tournament
    Request type: POST
    address: https://brawl-gg-backend.onrender.com/tournament
    Authorization header required: Any JWT
    Sample JSON:
    {
        "tournamentName": "Cup2024",
        "author": "JohnDoe",
        "teams": ["TeamA", "TeamB", "TeamC", "TeamD"],
        "game": "Chess",
        "gameStats": ["Wins", "Losses", "Draws"],
        "gameType": "Classic",
        "description": "Annual Chess Tournament",
        "minimumPlayers": 2,
        "maximumPlayers": 50,
        "password": "securepass123",
        "isAuthorPlayer": true
    }

    -------------------------------------------------------------------------

    Endpoint name : Update Tournamet
    Request type: PATCH
    address: https://brawl-gg-backend.onrender.com/tournament/:id
    Authorization required: JWT User that created tournament
    Sample JSON:
    {
        "tournamentName": "Cup2024",
        "author": "JohnDoe",
        "teams": ["TeamA", "TeamB", "TeamC", "TeamD"],
        "game": "Chess",
        "gameStats": ["Wins", "Losses", "Draws"],
        "gameType": "Classic",
        "description": "Annual Chess Tournament",
        "minimumPlayers": 2,
        "maximumPlayers": 50,
        "password": "securepass123",
        "isAuthorPlayer": true
    }

    Optional inputs = ["tournamentName", "author", "game", "gameStats", "gameType", "description", "min player", "max player", "password"]

    ----------------------------------------------------------------------

    Endpoint name : Delete Tournament
    Request type: Delete
    address: https://brawl-gg-backend.onrender.com/tournament/:id
    Authorization required: JWT User that created tournament

## Schemas

user {
username,
email,
password,
profile image,
tournaments,
isAdmin (An Admin can only be created manually)
}

userPasswordRecovery {
userEmail,
passcode,
createdAt,
}

chats {
message,
userId,
TournamentId,
CreatedAt
}

tournament {
tournamentName,
author,
Game,
GameStats,
gameType,
Description,
minimum players,
maximum players,
player stats[schema],
password,
joinLink,
users[],
chats[],
}

## Dependancies

- cors
- dotenv
- express
- google-auth-library
- googleapis
- mongoose
- nodemailer
- socket.io
- jsonwebtoken
- bcryptjs
