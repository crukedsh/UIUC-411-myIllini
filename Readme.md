# CS411 Project Track 1 Repo


## Project Structure
* bin: js file for starting the nodeJS server
* client: ReactJS application project file
* db: database file. ```db.sql``` is for database establishment
* routes: backend API routers, including the implementation
* app.js: main file of application
* package.json (package-lock.json): dependencies and configuration

## Deployment
* Operating System: Linux

1. Install Backend Dependencies:
```bash
npm install
```
2. Install Frontend Dependencies:
```angular2html
cd client
npm install
```
3. Build the Frontend
```angular2html
npm run build
```

4. Start the server
```angular2html
cd ..
npm start
```

5. Create mysql database (see ```db/db.sql```)

## Development Environment
* Frontend: [ReactJS](https://reactjs.org) + [MaterialUI](https://v0.material-ui.com/#/)
* Backend: [NodeJS Express](https://expressjs.com)
* Development Server: NodeJS
* IDE: WebStorm
* Database: mysql

**Open the directory ./ and ./client in WebStorm respectively in order to develop backend and frontend**

## [Demo](http://chenzhu2.web.illinois.edu)

## Interface and data format Specification
#### POST /users/login
```
{
     "email": "",
     "password":"",
}
```

* Response Body
```
{
        "error": "",
        "data": "",
        "token":""
}
```

#### POST /users/register

```json
{
     "first_name":"",
     "last_name":"",
     "email":"",
     "password":""
}
```
* Response Body
```
{
        "error": "",
        "data": "",
        "token":""
}
```

---
Oct.16 10:30 pm, chen zhu:
* Create frontend project
* Implement Login and Register UI
* deployment completed

---
Oct.12 10:17 pm, chen zhu:

* Created the repo
* Created SQL file in /db/db.sql
* User API:  /users/getUsers, /users/login, /users/register added
* TOFIX: add token authentication,
