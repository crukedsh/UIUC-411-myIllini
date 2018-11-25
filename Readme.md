
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
Request  
{  
 "email": "", "password":"",}  
```  
  
Response Body  
```  
{  
 "error": 0, "data": [ { "id": "goo", "first_name": "goo", "last_name": "goo", "email": "goo@illinois.edu", "password": "goo", "created_at": "2018-10-31T02:50:14.000Z", "type": "student" } ], "token": ""}  
```  
  
#### POST /users/register  
Request  
  
```json  
{  
  "first_name":"",  
  "last_name":"",  
  "email":"",  
  "password":""  
}  
```  
Response Body  
```  
{  
 "error": "", "data": "", "token":""}  
```  
  
#### GET /students/course-selected/:userID  
Each course has two shedule_id.
```  
{
    "error": "",
    "data": [
        {
            "enrolled_num": 1,
            "crn": 436,
            "title": "Computer Network Lab",
            "capacity": 50,
            "description": "Useful course",
            "start_time": "11:15:00",
            "end_time": "12:30:00",
            "weekday": "W",
            "location": "siebel",
            "schedule_id": 1
        },
        {
            "enrolled_num": 1,
            "crn": 436,
            "title": "Computer Network Lab",
            "capacity": 50,
            "description": "Useful course",
            "start_time": "13:15:00",
            "end_time": "14:30:00",
            "weekday": "M",
            "location": "siebel",
            "schedule_id": 2
        }
    ]
}
```  
  
#### GET /students/course-unselected/:userID  
Like course-selected
  
#### POST /students/course-register  
Transaction created.
Request:  
```  
{  
“user_id”:””,  
“crn”:””  
}  
```  
  
Response:  
```  
{  
 "error": "", "data": "success"}  
```  
#### POST /students/course-drop  
Transaction created.
Request:  
```  
{  
“user_id”:””,  
“crn”:””  
}  
```  
  
Response:  
```  
{  
 "error": "", "data": "success"}  
```  
  
  
#### POST /professors/create-course  
Transaction created.
Request:  
```  
{  
"crn": [integer],  
"user_id":""  
"title":"",  
"capacity": [integer],
"description": "",
"schedule_id_1": [integer],
"start_time_1": "xx:yy" (24 hour format)
"end_time_1": "xx:yy"
"weekday_1": "W",
"location_1": ""
"schedule_id_2": [integer],
"start_time_2": "xx:yy"
"end_time_2": "xx:yy"
"weekday_2": "W",
"location_2": ""
}  
```  
  
Response:  
```  
{  
 "error": "", "data": "success"}  
```  
  
  
#### POST /professors/delete-course  
  
Request:  
```  
{  
"crn": [integer],  
}  
```  
  
Response:  
```  
{  
 "error": "", "data": "success"}  
```  
  
#### POST /professors/edit-course  
 The same as create-course
Request:  
```  
{  
15 attributes
}  
```  
  
Response:  
```  
{  
 "error": "", "data": "success"}  
```  
  
#### POST /professors/assign-score  
  
Request:  
```  
{  
"grade": [integer],  
"user_id":""  
"crn":"",  
"type": "student"  
}  
```  
  
Response:  
```  
{  
 "error": "", "data": "success"}  
```  
  
  
#### POST /professors/course-info  
  
Request:  
```  
{  
"user_id":  
}  
```  
  
Response:  
Each course has two schedule_id
```  
{
    "error": "",
    "data": [
        {
            "crn": 436,
            "title": "Computer Network Lab",
            "enrolled_num": 1,
            "capacity": 50,
            "start_time": "11:15:00",
            "end_time": "12:30:00",
            "weekday": "W",
            "location": "siebel"
        },
        {
            "crn": 436,
            "title": "Computer Network Lab",
            "enrolled_num": 1,
            "capacity": 50,
            "start_time": "13:15:00",
            "end_time": "14:30:00",
            "weekday": "M",
            "location": "siebel"
        },
        {
            "crn": 438,
            "title": "Computer Network",
            "enrolled_num": 0,
            "capacity": 30,
            "start_time": "11:15:00",
            "end_time": "12:30:00",
            "weekday": "W",
            "location": "siebel"
        },
        {
            "crn": 438,
            "title": "Computer Network",
            "enrolled_num": 0,
            "capacity": 30,
            "start_time": "11:15:00",
            "end_time": "12:30:00",
            "weekday": "M",
            "location": "siebel"
        }
    ]
}
```  
  
  
#### POST /courses/course-detail  
  
Request:  
```  
{  
"crn": [integer]  
}  
```  
  
Response:  
```  
{
    "error": "",
    "data": [
        {
            "crn": 436,
            "user_id": "Matt",
            "title": "Computer Network Lab",
            "description": "Useful course",
            "capacity": 50,
            "enrolled_num": 1,
            "schedule_id": 1,
            "start_time": "11:15:00",
            "end_time": "12:30:00",
            "weekday": "W",
            "location": "siebel"
        },
        {
            "crn": 436,
            "user_id": "Matt",
            "title": "Computer Network Lab",
            "description": "Useful course",
            "capacity": 50,
            "enrolled_num": 1,
            "schedule_id": 2,
            "start_time": "13:15:00",
            "end_time": "14:30:00",
            "weekday": "M",
            "location": "siebel"
        }
    ]
}
```  
  
---  
  
Oct 29 11:30 pm, chen zhu:  
* add student api  
  
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