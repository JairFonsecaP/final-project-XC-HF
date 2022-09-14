# final-project-XC-HF

## Backend
________________________________

### DB

Run the following script on postgres "run separately".
```sql
CREATE DATABASE musicplaylist;
```
```sql
CREATE USER test WITH PASSWORD 'test' SUPERUSER;
```

Being in the directory ./Backend For running the Backend, run the following steps

```bash
$ npm install
$ npm install -g sequelize
$ npm run migrations
$ npm run seed
$ npm start
```


#### Endpoints V1

* Users
```
POST
/v1/api/user/register

Body 
    string name (required)
    string username: (required)
    string password: (required)
    string password2: (required)  must be the same to password.

```


Response:
```JSON
201
{
    "success": {
        "msg": "User created, you can login now"
    }
}
```
```JSON
400
{
	"errors": [
		{
			"msg": "You must to enter a name",
			"param": "name",
			"location": "body"
		},
		{
			"msg": "You must to enter a password",
			"param": "password",
			"location": "body"
		},
		{
			"value": "12345678",
			"msg": "Both password must to be the same",
			"param": "password2",
			"location": "body"
		}
	]
}
```
```JSON
409
{
	"errors": [
		{
			"msg": "The username already exists, please try another one",
			"param": "username"
		}
	]
}
```
    
```
POST
/v1/api/user/login

Body 
    string username: (required)
    string password: (required)
```

Response
```JSON
200
{
	"token": {token}
}
```
```JSON
401
{
	"errors": [
		{
			"msg": "Username or password invalid please try again.",
			"param": "login"
		}
	]
}
```
```JSON
500
{
            "errors": [
                {
                    "msg": {message},
                    "param": "server"
                }
            ]
        }
```

