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
		"favorite": 0
	}
]
```
```
GET
/v1/api/album/favorites
```
Response
```JSON
code: 200

[
	{
		"id": 1166416,
		"type": "label",
		"user_data": {
			"in_wantlist": false,
			"in_collection": false
		},
		"master_id": null,
		"master_url": null,
		"uri": "/label/1166416-Antologia-3",
		"title": "Antologia (3)",
		"thumb": "",
		"cover_image": "https://st.discogs.com/9c7fd0a33d617a3b8f916e783829bdbd290030ff/images/spacer.gif",
		"resource_url": "https://api.discogs.com/labels/1166416",
		"favorite": 1
	}
]
```
```
GET
/v1/api/album/detail/{id}
```
Response
```JSON
code: 200

{
	"id": 14860897,
	"status": "Accepted",
	"year": 2020,
	"resource_url": "https://api.discogs.com/releases/14860897",
	"uri": "https://www.discogs.com/release/14860897-Bad-Bunny-YHLQMDLG",
	"artists": [
		{
			"name": "Bad Bunny",
			"anv": "",
			"join": "",
			"role": "",
			"tracks": "",
			"id": 5894905,
			"resource_url": "https://api.discogs.com/artists/5894905"
		}
	],
	"artists_sort": "Bad Bunny",
	"labels": [
		{
			"name": "Rimas Entertainment LLC",
			"catno": "none",
			"entity_type": "1",
			"entity_type_name": "Label",
			"id": 1533610,
			"resource_url": "https://api.discogs.com/labels/1533610"
		}
	],
	"series": [],
	"companies": [],
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
	"data_quality": "Needs Vote",
	"community": {
		"have": 62,
		"want": 112,
		"rating": {
			"count": 34,
			"average": 2.24
		},
		"submitter": {
			"username": "aevhernandez",
			"resource_url": "https://api.discogs.com/users/aevhernandez"
		},
		"contributors": [
			{
				"username": "aevhernandez",
				"resource_url": "https://api.discogs.com/users/aevhernandez"
			},
			{
				"username": "AlejandroGO",
				"resource_url": "https://api.discogs.com/users/AlejandroGO"
			},
			{
				"username": "nihilisten",
				"resource_url": "https://api.discogs.com/users/nihilisten"
			},
			{
				"username": "JMNEZ",
				"resource_url": "https://api.discogs.com/users/JMNEZ"
			},
			{
				"username": "Mazter9",
				"resource_url": "https://api.discogs.com/users/Mazter9"
			},
			{
				"username": "Palante",
				"resource_url": "https://api.discogs.com/users/Palante"
			}
		],
		"data_quality": "Needs Vote",
		"status": "Accepted"
	},
	"format_quantity": 0,
	"date_added": "2020-02-29T08:34:04-08:00",
	"date_changed": "2021-12-26T20:54:28-08:00",
	"num_for_sale": 0,
	"lowest_price": null,
	"master_id": 1691517,
	"master_url": "https://api.discogs.com/masters/1691517",
	"title": "YHLQMDLG",
	"released": "2020-02-29",
	"notes": "https://yhlqmdlg.com/",
	"released_formatted": "29 Feb 2020",
	"identifiers": [],
	"videos": [
		{
			"uri": "https://www.youtube.com/watch?v=CPK_IdHe1Yg",
			"title": "Si Veo a Tu Mamá - Bad Bunny ( Video Oficial )",
			"description": "Si Veo a Tu Mamá - Bad Bunny\nEL ÚLTIMO TOUR DEL MUNDO\nhttp://elultimotourdelmundo.com/\n\n#YHLQMDLG\n\nDOWNLOAD: http://YHLQMDLG.live\n\nMERCH: https://YHLQMDLG.com\n\n-Click para suscribirte: http://bit.ly/badbunnypr\n\nFollow Me / Sigueme en: \n\nInstagram: https",
			"duration": 266,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=fEYUoBgYKzw",
			"title": "La Difícil - Bad Bunny (Video Oficial ) | YHLQMDLG",
			"description": "La Difícil - Bad Bunny\nEL ÚLTIMO TOUR DEL MUNDO\nhttps://elultimotourdelmundo.com\n\n#YHLQMDLG\n\nDOWNLOAD: http://YHLQMDLG.live\n\nMERCH: https://YHLQMDLG.com\n\n-Click para suscribirte: http://bit.ly/badbunnypr\n\nFollow Me / Sigueme en: \n\nInstagram: https://www",
			"duration": 193,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=bg82FqrCjcs",
			"title": "Pero Ya No - Bad Bunny ( Video Oficial )",
			"description": "Pero Ya No - Bad Bunny \nEL ÚLTIMO TOUR DEL MUNDO\nhttps://elultimotourdelmundo.com\n#YHLQMDLG\n\nDOWNLOAD: https://YHLQMDLG.live\n\nMERCH: https://YHLQMDLG.com\n\n-Click para suscribirte: http://bit.ly/badbunnypr\n\nFollow Me / Sigueme en: \n\nInstagram: https://www",
			"duration": 165,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=GtSRKwDCaZM",
			"title": "Yo Perreo Sola - Bad Bunny ( Video Oficial )",
			"description": "Yo Perreo Sola - Bad Bunny\nEL ÚLTIMO TOUR DEL MUNDO\nhttp://elultimotourdelmundo.com/\n\nYo Perreo Sola Remix - https://youtu.be/WBnBntk7LbE\n#YHLQMDLG\n\nDOWNLOAD YHLQMDLG: https://rimas.io/YHLQMDLG\n\nMERCH: https://YHLQMDLG.com\n\n-Click para suscribirte: http:",
			"duration": 201,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=Udxl17LVHYA",
			"title": "Bichiyal - Bad Bunny x Yaviah ( Video Oficial )",
			"description": "Bichiyal - Bad Bunny x Yaviah\nEL ÚLTIMO TOUR DEL MUNDO\nhttps://elultimotourdelmundo.com\n#YHLQMDLG\n\nDOWNLOAD: https://YHLQMDLG.live\n\nMERCH: https://YHLQMDLG.com\n\n-Click para suscribirte: http://bit.ly/badbunnypr\n\nFollow Me / Sigueme en: \n\nInstagram: https",
			"duration": 266,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=f5aDUB1NCnk",
			"title": "VETE - Bad Bunny ( Video Oficial )",
			"description": "EL ÚLTIMO TOUR DEL MUNDO\nhttps://elultimotourdelmundo.com\n\n\nLETRA\n\nYeh, Yeh, Yeh, Yeh\nYeh, Yeh, Yeh, Yeh\n\nSi te vas yo quiero saber si tu te vas mami \nCuando tu quieras, Cuando tu quieras\n\nYeh Yeh\n\nVete eh eh eh \nNadie te esta aguanto y la puerta esta ab",
			"duration": 208,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=PC0GvyEIXfk",
			"title": "Ignorantes - Bad Bunny x Sech ( Video Oficial )",
			"description": "Ignorantes - Bad Bunny x Sech\nEL ÚLTIMO TOUR DEL MUNDO\nhttps://elultimotourdelmundo.com\r\n\r\n\r\nFollow Me / Sigueme en: \r\nBAD BUNNY:\r\nInstagram: https://www.instagram.com/badbunnypr/\r\nFacebook: https://www.facebook.com/BadBunnyOfficial/\nTwitter: https://twi",
			"duration": 248,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=gSMYGP0TYC4",
			"title": "BAD BUNNY x MORA - UNA VEZ (Video Oficial)",
			"description": "BAD BUNNY x MORA\nUNA VEZ | YHLQMDLG (Video Oficial)\nhttps://elultimotourdelmundo.com/\n\nEscucha YHLQMDLG: https://rimas.ffm.to/yhlqmdlg\n\nMerch:\nhttps://shop.elultimotourdelmundo.com/\nhttps://YHLQMDLG.com\n\nSuscríbete al canal: https://rimas.ffm.to/ytbadbun",
			"duration": 280,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=j2FNs-hX93E",
			"title": "Hablamos Mañana - Bad Bunny x Duki x Pablo Chill-E ( Video oficial )",
			"description": "Hablamos Mañana - Bad Bunny x Duki x Pablo Chill-E\nEL ÚLTIMO TOUR DEL MUNDO\nhttps://elultimotourdelmundo.com\n#YHLQMDLG\n\nDOWNLOAD YHLQMDLG: https://YHLQMDLG.live\n\nMERCH: https://YHLQMDLG.com\n\n-Click para suscribirte: http://bit.ly/badbunnypr\n\nFollow Me /",
			"duration": 297,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=jCQ_6XbATPc",
			"title": "Safaera - Bad Bunny x Jowell & Randy x Ñengo Flow | YHLQMDLG",
			"description": "Safaera - Bad Bunny x Jowell & Randy x Ñengo Flow \n#YHLQMDLG\n\nDOWNLOAD: http://YHLQMDLG.live\n\nMERCH: https://YHLQMDLG.com\n\n-Click para suscribirte: http://bit.ly/badbunnypr\n\nFollow Me / Sigueme en: \n\nInstagram: https://www.instagram.com/badbunnypr/\nFaceb",
			"duration": 296,
			"embed": true
		},
		{
			"uri": "https://www.youtube.com/watch?v=YwO6PXtOaSY",
			"title": "UNBOXING: Bad Bunny en Casette - YHLQMDLG ~ Hablamos Mañana",
			"description": "#BadBunny en Casette - #YHLQMDLG\n#Reggaeton #HablamosMañana\n\nCasette: https://www.discogs.com/es/Bad-Bunny-YHLQMDLG/release/14881160 \n\nTwitter: https://twitter.com/HectorIgnorado\nIG: @hectorignorado\n\nTorna: https://www.audio-technica.com/es-mx/at-lp60-usb",
			"duration": 0,
			"embed": true
		}
	],
	"genres": [
		"Hip Hop",
		"Reggae",
		"Latin"
	],
	"styles": [
		"Reggaeton",
		"Reggae-Pop"
	],
	"tracklist": [
		{
			"position": "1",
			"type_": "track",
			"title": "Si Veo A Tu Mamá",
			"extraartists": [
				{
					"name": "Elikai",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812601,
					"resource_url": "https://api.discogs.com/artists/7812601"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "2:51"
		},
		{
			"position": "2",
			"type_": "track",
			"title": "La Difícil",
			"extraartists": [
				{
					"name": "Lenex",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812593,
					"resource_url": "https://api.discogs.com/artists/7812593"
				},
				{
					"name": "Mora (20)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812603,
					"resource_url": "https://api.discogs.com/artists/7812603"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "2:43"
		},
		{
			"position": "3",
			"type_": "track",
			"title": "Pero Ya No",
			"extraartists": [
				{
					"name": "Dez Washington",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812595,
					"resource_url": "https://api.discogs.com/artists/7812595"
				},
				{
					"name": "EMG (7)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812597,
					"resource_url": "https://api.discogs.com/artists/7812597"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "2:41"
		},
		{
			"position": "4",
			"type_": "track",
			"title": "La Santa",
			"extraartists": [
				{
					"name": "Daddy Yankee",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 256399,
					"resource_url": "https://api.discogs.com/artists/256399"
				},
				{
					"name": "Tainy",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 868221,
					"resource_url": "https://api.discogs.com/artists/868221"
				}
			],
			"duration": "3:26"
		},
		{
			"position": "5",
			"type_": "track",
			"title": "Yo Perreo Sola",
			"extraartists": [
				{
					"name": "Bad Bunny",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 5894905,
					"resource_url": "https://api.discogs.com/artists/5894905"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				},
				{
					"name": "Tainy",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 868221,
					"resource_url": "https://api.discogs.com/artists/868221"
				}
			],
			"duration": "2:52"
		},
		{
			"position": "6",
			"type_": "track",
			"title": "Bichiyal",
			"extraartists": [
				{
					"name": "Yaviah",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 2273743,
					"resource_url": "https://api.discogs.com/artists/2273743"
				},
				{
					"name": "Nesty",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 1117791,
					"resource_url": "https://api.discogs.com/artists/1117791"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "3:17"
		},
		{
			"position": "7",
			"type_": "track",
			"title": "Soliá",
			"extraartists": [
				{
					"name": "Demy & Clipz",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7921681,
					"resource_url": "https://api.discogs.com/artists/7921681"
				},
				{
					"name": "Mora (19)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7692537,
					"resource_url": "https://api.discogs.com/artists/7692537"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "2:39"
		},
		{
			"position": "8",
			"type_": "track",
			"title": "La Zona",
			"extraartists": [
				{
					"name": "Chris Jeday",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 3750021,
					"resource_url": "https://api.discogs.com/artists/3750021"
				},
				{
					"name": "Gaby Music",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 4309350,
					"resource_url": "https://api.discogs.com/artists/4309350"
				},
				{
					"name": "Haze (101)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7629686,
					"resource_url": "https://api.discogs.com/artists/7629686"
				},
				{
					"name": "Nino (88)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812599,
					"resource_url": "https://api.discogs.com/artists/7812599"
				}
			],
			"duration": "2:17"
		},
		{
			"position": "9",
			"type_": "track",
			"title": "Que Malo",
			"extraartists": [
				{
					"name": "Ñengo Flow",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 3927806,
					"resource_url": "https://api.discogs.com/artists/3927806"
				},
				{
					"name": "Jota Rosa",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812604,
					"resource_url": "https://api.discogs.com/artists/7812604"
				},
				{
					"name": "Mvsis",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812600,
					"resource_url": "https://api.discogs.com/artists/7812600"
				}
			],
			"duration": "2:48"
		},
		{
			"position": "10",
			"type_": "track",
			"title": "Vete",
			"extraartists": [
				{
					"name": "Hazen",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 358268,
					"resource_url": "https://api.discogs.com/artists/358268"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "3:12"
		},
		{
			"position": "11",
			"type_": "track",
			"title": "Ignorantes",
			"extraartists": [
				{
					"name": "Sech (4)",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 7177917,
					"resource_url": "https://api.discogs.com/artists/7177917"
				},
				{
					"name": "Dimelo Flow",
					"anv": "Dímelo Flow",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7177915,
					"resource_url": "https://api.discogs.com/artists/7177915"
				},
				{
					"name": "Soltedo Beats",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812591,
					"resource_url": "https://api.discogs.com/artists/7812591"
				}
			],
			"duration": "3:31"
		},
		{
			"position": "12",
			"type_": "track",
			"title": "A Tu Merced",
			"extraartists": [
				{
					"name": "DJ EZ Beat",
					"anv": "EZ Made Da Beat",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 472575,
					"resource_url": "https://api.discogs.com/artists/472575"
				},
				{
					"name": "Prida",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812594,
					"resource_url": "https://api.discogs.com/artists/7812594"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "2:56"
		},
		{
			"position": "13",
			"type_": "track",
			"title": "Una Vez",
			"extraartists": [
				{
					"name": "Mora (19)",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 7692537,
					"resource_url": "https://api.discogs.com/artists/7692537"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				},
				{
					"name": "Taiko (11)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812589,
					"resource_url": "https://api.discogs.com/artists/7812589"
				}
			],
			"duration": "3:52"
		},
		{
			"position": "14",
			"type_": "track",
			"title": "Safaera",
			"extraartists": [
				{
					"name": "Jowell Y Randy",
					"anv": "Jowell & Randy",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 1124644,
					"resource_url": "https://api.discogs.com/artists/1124644"
				},
				{
					"name": "Ñengo Flow",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 3927806,
					"resource_url": "https://api.discogs.com/artists/3927806"
				},
				{
					"name": "DJ Orma",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812605,
					"resource_url": "https://api.discogs.com/artists/7812605"
				},
				{
					"name": "Tainy",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 868221,
					"resource_url": "https://api.discogs.com/artists/868221"
				}
			],
			"duration": "4:55"
		},
		{
			"position": "15",
			"type_": "track",
			"title": "25/8",
			"extraartists": [
				{
					"name": "Based 1",
					"anv": "Based1",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7524796,
					"resource_url": "https://api.discogs.com/artists/7524796"
				},
				{
					"name": "Elikai",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812601,
					"resource_url": "https://api.discogs.com/artists/7812601"
				},
				{
					"name": "Hide Miyabi",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812608,
					"resource_url": "https://api.discogs.com/artists/7812608"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "4:03"
		},
		{
			"position": "16",
			"type_": "track",
			"title": "Está Cabrón Ser Yo",
			"extraartists": [
				{
					"name": "Anuel AA",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 5794658,
					"resource_url": "https://api.discogs.com/artists/5794658"
				},
				{
					"name": "Frank King (7)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812590,
					"resource_url": "https://api.discogs.com/artists/7812590"
				},
				{
					"name": "Payday (12)",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812602,
					"resource_url": "https://api.discogs.com/artists/7812602"
				}
			],
			"duration": "3:48"
		},
		{
			"position": "17",
			"type_": "track",
			"title": "Puesto Pa' Guerrial",
			"extraartists": [
				{
					"name": "Myke Towers",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 7260899,
					"resource_url": "https://api.discogs.com/artists/7260899"
				},
				{
					"name": "Hazen",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 358268,
					"resource_url": "https://api.discogs.com/artists/358268"
				},
				{
					"name": "Subelo NEO",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812598,
					"resource_url": "https://api.discogs.com/artists/7812598"
				}
			],
			"duration": "3:10"
		},
		{
			"position": "18",
			"type_": "track",
			"title": "P FKN R",
			"extraartists": [
				{
					"name": "Arcángel",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 1337937,
					"resource_url": "https://api.discogs.com/artists/1337937"
				},
				{
					"name": "Kendo Kaponi",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 4410131,
					"resource_url": "https://api.discogs.com/artists/4410131"
				},
				{
					"name": "Forthenight",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812596,
					"resource_url": "https://api.discogs.com/artists/7812596"
				},
				{
					"name": "Theskybeats",
					"anv": "The SkyBeats",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812540,
					"resource_url": "https://api.discogs.com/artists/7812540"
				}
			],
			"duration": "4:18"
		},
		{
			"position": "19",
			"type_": "track",
			"title": "Hablamos Mañana",
			"extraartists": [
				{
					"name": "Duki",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 5798997,
					"resource_url": "https://api.discogs.com/artists/5798997"
				},
				{
					"name": "Pablo Chill-E",
					"anv": "",
					"join": "",
					"role": "Featuring",
					"tracks": "",
					"id": 6902653,
					"resource_url": "https://api.discogs.com/artists/6902653"
				},
				{
					"name": "Albert Hype",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812607,
					"resource_url": "https://api.discogs.com/artists/7812607"
				},
				{
					"name": "Tainy",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 868221,
					"resource_url": "https://api.discogs.com/artists/868221"
				}
			],
			"duration": "4:00"
		},
		{
			"position": "20",
			"type_": "track",
			"title": "<3",
			"extraartists": [
				{
					"name": "Albert Hype",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 7812607,
					"resource_url": "https://api.discogs.com/artists/7812607"
				},
				{
					"name": "Tainy",
					"anv": "",
					"join": "",
					"role": "Producer",
					"tracks": "",
					"id": 868221,
					"resource_url": "https://api.discogs.com/artists/868221"
				}
			],
			"duration": "2:38"
		}
	],
	"extraartists": [],
	"images": [
		{
			"type": "primary",
			"uri": "",
			"resource_url": "",
			"uri150": "",
			"width": 600,
			"height": 600
		},
		{
			"type": "secondary",
			"uri": "",
			"resource_url": "",
			"uri150": "",
			"width": 600,
			"height": 600
		}
	],
	"thumb": "",
	"blocked_from_sale": false
}
```
```
POST
/v1/api/album/addFavorite

Body
	Number itemId: (required)
    string name: (required)
```
Response
```JSON
code: 201

{
	"success": {
		"msg": "Album was added as favorite"
	}
}
```

```JSON
code: 209

{
	"errors": [
		{
			"msg": "The favorite already exists, please try another one",
			"param": "favorite Album"
		}
	]
}
```
```
DELETE
/v1/api/delete/{id}
```
```JSON
code: 200
{
	"success": [
		{
			"msg": "Album deleted successfully!",
			"param": "Success"
		}
	]
}
```
```JSON
code: 404

{
	"errors": [
		{
			"msg": "Error deleting favorite album. Album not found.",
			"param": "Not found"
		}
	]
}
```