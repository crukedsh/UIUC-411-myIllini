# CS411 Project Track 1 Backend Repo

## Interface and data format Specification

#### /users/login
* POST
```json
{
     "email": "",
     "password":"",
}
```

* Response Body
{
        "error": "",
        "data": "",
        "token":""
}

#### /users/register
* POST
```json
{
     "first_name":
     "last_name":
     "email":
     "password":
}
```
* Response Body
{
        "error": "",
        "data": "",
        "token":""
}
---
Oct.12 10:17 pm, chen zhu:

* Created the repo
* Created SQL file in /db/db.sql
* User API:  /users/getUsers, /users/login, /users/register added
* TOFIX: add token authentication,
