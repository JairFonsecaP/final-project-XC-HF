# final-project-XC-HF

## Backend

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
code: 201
{
    "success": {
        "msg": "User created, you can login now"
    }
}
```
```JSON
code: 400
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
code: 409
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
code: 200
{
	"token": {token}
}
```
```JSON
code: 401
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
code: 500
{
    "errors": [
        {
            "msg": {message},
            "param": "server"
        }
    ]
}
```

* Authentication

For the rest endpoints you must to send the token inside the header...
Example to set headers with axios.

```javascript
import axios from 'axios';

axios.get('/route', { headers: { token: '' } })
```
If you don't send a valid token the response is:

```JSON
code: 401
{
	"errors": [
		{
			"msg": "Please enter your credentials",
			"param": "Login"
		}
	]
}
```

* Albums
```
GET
/v1/api/album/getalbum/{name}

	string name (required)
```
Response:
```JSON
code: 200
[
	{
		"country": "Unknown",
		"year": "2020",
		"format": [
			"File",
			"AAC",
			"Album"
		],
		"label": [
			"Rimas Entertainment LLC"
		],
		"type": "release",
		"genre": [
			"Hip Hop",
			"Reggae",
			"Latin"
		],
		"style": [
			"Reggaeton",
			"Reggae-Pop"
		],
		"id": 14860897,
		"barcode": [],
		"user_data": {
			"in_wantlist": false,
			"in_collection": false
		},
		"master_id": 1691517,
		"master_url": "https://api.discogs.com/masters/1691517",
		"uri": "/release/14860897-Bad-Bunny-YHLQMDLG",
		"catno": "none",
		"title": "Bad Bunny - YHLQMDLG",
		"thumb": "https://i.discogs.com/Yu_HDLra4KUyuGqKEOYrnVmpxISawe3zSRCKqkPigwc/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODYw/ODk3LTE1ODMzNzE5/OTEtOTM1My5qcGVn.jpeg",
		"cover_image": "https://i.discogs.com/9IWgtGzdwhFcRaBroRHJeSbUJdoVbnWwsxGpvIYJmvc/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODYw/ODk3LTE1ODMzNzE5/OTEtOTM1My5qcGVn.jpeg",
		"resource_url": "https://api.discogs.com/releases/14860897",
		"community": {
			"want": 112,
			"have": 62
		},
		"format_quantity": 0,
		"formats": [
			{
				"name": "File",
				"qty": "20",
				"text": "256 Kbps",
				"descriptions": [
					"AAC",
					"Album"
				]
			}
		],
		"favorite": 0	}
]
```