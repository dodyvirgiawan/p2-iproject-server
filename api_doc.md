# Cineclub Server

Cineclub is a web application that lets you share your favourite movies, via a playlist that will be readily shared to the world. Currently this app has:
- RESTful endpoint for playlist CRUD operation
- Response will be formatted in JSON

&nbsp;

# Account Related Endpoints
In order to access all of our resource endpoints, you must have a valid account in our database first. Please either register if you don't have account, or login if you already have one.

&nbsp;

## **1. POST /login**
Use this endpoint to register. Don't worry, your password is safely hashed into our database.

&nbsp;

### **Request Header**
```
not needed
```

### **Request Body**
```
{
    "first_name": "Dody",
    "last_name": "Virgiawan",
    "email": "dody@email.com",
    "password": "myverysecretpassword"
}
```

### **Response (201) - OK**
```
{
    "id": 1,
    "first_name": "Dody",
    "last_name": "Virgiawan",
    "email": "dody@email.com"
}
```

### **Response (400) - BAD REQUEST**
The e-mail you specified is already registered.

```
{
    "message": "Email dody@email.com is already registered"
}
```
You didn't specify any of the fields.
```
{
    "message": [
        "<< field name >> is required"
    ]
}
```

&nbsp;

## **2. POST /login**
Use this endpoint to login.

&nbsp;

### **Request Header**
```
not needed
```

### **Request Body**
```
{
    "email": "dody@email.com",
    "password": "myverysecretpassword"
}
```

### **Response (200) - OK**
```
{
    "access_token": {{accesstoken}}
}
```

### **Response (401) - UNAUTHORIZED**
The e-mail or password you specified is invalid

```
{
    "message": "Invalid email or password"
}
```

&nbsp;

## **3. POST /auth/google**
Use this endpoint to register & login directly from your google account.

&nbsp;

### **Request Header**
```
not needed
```

### **Request Body**
```
{
    "id_token": {{googleIdToken}}
}
```

### **Response (200) - OK**
```
{
    "access_token": {{accesstoken}}
}
```

&nbsp;

## **4. GET /user**
Use this endpoint to get the current logged in user info.

&nbsp;

### **Request Header**
```
not needed
```

### **Request Body**
```
{
    "access_token": {{access_token}}
}
```

### **Response (200) - OK**
```
{
    "id": 1,
    "first_name": "Dody",
    "last_name": "Virgiawan",
    "email": "dody@email.com"
}
```

### **Response (401) - UNAUTHORIZED**
```
{
    "message": "Please login first!"
}
```


&nbsp;


# Resource Endpoints

## **1. GET /playlists**

Use this endpoint to get all the current movie playlist from our database.

&nbsp;

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```

### **Request Body**
```
not needed
```

### **Response (200) - OK**
Notes: Playlist will be sorted from newest created first.
```
[
    {
        "id": 3,
        "title": "Awesome action movies",
        "description": "Hey guys! This is an awesome playlist about action movies. What do you guys think?",
        "createdAt": "2021-08-23T13:48:06.389Z",
        "author": {
            "first_name": "Rachel",
            "last_name": "Greene",
            "email": "rachelgreene@email.com"
        },
        "Comments": [],
        "Movies": [
            {
                "title": "Dunkirk",
                "genre": "Action",
                "runtime": 106,
                "director": "Christopher Nolan",
                "imdbRating": 7.8,
                "posterUrl": "https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"
            }
        ]
    },
    {
        "id": 2,
        "title": "Movie that will entertain your day",
        "description": "Hello guys! Today I will be sharing my awesome movie playlist for you to watch during weekend. For me, these movies are really great to watch, especially when you are spending your time with your family. What do you think?",
        "createdAt": "2021-08-23T13:47:41.302Z",
        "author": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@email.com"
        },
        "Comments": [
            {
                "comment": "Wow! Awesome list! Will be sure to watch with my family during the weekend.",
                "createdAt": "2021-08-23T13:47:41.328Z",
                "author": {
                    "first_name": "Joey",
                    "last_name": "Tribbiani",
                    "email": "joeytribbiani@email.com"
                }
            },
            {
                "comment": "Great collections!",
                "createdAt": "2021-08-23T13:47:41.328Z",
                "author": {
                    "first_name": "Rachel",
                    "last_name": "Greene",
                    "email": "rachelgreene@email.com"
                }
            }
        ],
        "Movies": [
            {
                "title": "Blade Runner 2049",
                "genre": "Action",
                "runtime": 164,
                "director": "Denis Villeneuve",
                "imdbRating": 8,
                "posterUrl": "https://upload.wikimedia.org/wikipedia/id/f/f2/Blade_Runner_2049_Poster.jpg"
            },
            {
                "title": "Ready Player One",
                "genre": "Science Fiction",
                "runtime": 140,
                "director": "Steven Spielberg",
                "imdbRating": 7.4,
                "posterUrl": "https://upload.wikimedia.org/wikipedia/id/0/0c/Ready_player_one_ver2_xlg.jpg"
            }
        ]
    }
]
```
### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```

&nbsp;

## **2. GET /playlists/user**

Use this endpoint to get the current logged in user's playlist

&nbsp;

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```

### **Request Body**
```
not needed
```

### **Response (200) - OK**

```
[
    {
        "id": 3,
        "title": "Awesome action movies",
        "description": "Hey guys! This is an awesome playlist about action movies. What do you guys think?",
        "createdAt": "2021-08-23T13:48:06.389Z",
        "author": {
            "first_name": "Rachel",
            "last_name": "Greene",
            "email": "rachelgreene@email.com"
        },
        "Comments": [],
        "Movies": [
            {
                "title": "Dunkirk",
                "genre": "Action",
                "runtime": 106,
                "director": "Christopher Nolan",
                "imdbRating": 7.8,
                "posterUrl": "https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"
            }
        ]
    },
    {
        "id": 1,
        "title": "Movie that will entertain your day",
        "description": "Hello guys! Today I will be sharing my awesome movie playlist for you to watch during weekend. For me, these movies are really great to watch, especially when you are spending your time with your family. What do you think?",
        "createdAt": "2021-08-23T13:47:41.302Z",
        "author": {
            "first_name": "Rachel",
            "last_name": "Greene",
            "email": "rachelgreene@email.com"
        },
        "Comments": [
            {
                "comment": "Wow! Awesome list! Will be sure to watch with my family during the weekend.",
                "createdAt": "2021-08-23T13:47:41.328Z",
                "author": {
                    "first_name": "Joey",
                    "last_name": "Tribbiani",
                    "email": "joeytribbiani@email.com"
                }
            },
            {
                "comment": "Great collections!",
                "createdAt": "2021-08-23T13:47:41.328Z",
                "author": {
                    "first_name": "Rachel",
                    "last_name": "Greene",
                    "email": "rachelgreene@email.com"
                }
            }
        ],
        "Movies": [
            {
                "title": "Blade Runner 2049",
                "genre": "Action",
                "runtime": 164,
                "director": "Denis Villeneuve",
                "imdbRating": 8,
                "posterUrl": "https://upload.wikimedia.org/wikipedia/id/f/f2/Blade_Runner_2049_Poster.jpg"
            },
            {
                "title": "Ready Player One",
                "genre": "Science Fiction",
                "runtime": 140,
                "director": "Steven Spielberg",
                "imdbRating": 7.4,
                "posterUrl": "https://upload.wikimedia.org/wikipedia/id/0/0c/Ready_player_one_ver2_xlg.jpg"
            }
        ]
    }
]
```
### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```


&nbsp;

## **3. GET /playlists/:id**

Use this endpoint to get playlist by id.

&nbsp;

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```

### **Request Params**
The ID for the playlists you want to get.
```
id = [integer]
```

### **Request Body**
```
not needed
```

### **Response (200) - OK**

```
{
    "id": 3,
    "title": "Awesome action movies",
    "description": "Hey guys! This is an awesome playlist about action movies. What do you guys think?",
    "createdAt": "2021-08-23T13:48:06.389Z",
    "author": {
        "first_name": "Rachel",
        "last_name": "Greene",
        "email": "rachelgreene@email.com"
    },
    "Comments": [],
    "Movies": [
        {
            "title": "Dunkirk",
            "genre": "Action",
            "runtime": 106,
            "director": "Christopher Nolan",
            "imdbRating": 7.8,
            "posterUrl": "https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"
        }
    ]
}
```

### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```

### **Response (404) - NOT FOUND**
Playlist Id is not found in the database.
```
{
    "message": "Playlist not found"
}
```

&nbsp;

## **4. POST /playlists**

Use this endpoint to create a brand new playlist, along with the movie you have selected.

&nbsp;

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```

### **Request Body**
Specify the playlist data (title, description) and movie data (title, genre, runtime, director, imdbRating, posterUrl) in the req.body
```
{
    "playlist_title": [string],
    "playlist_description": [string],
    "movie_title": [string],
    "movie_genre": [string],
    "movie_runtime": [integer],
    "movie_director": [string],
    "movie_imdbRating": [float],
    "movie_posterUrl": [string]
}
```


### **Response (200) - OK**

```
{
    message: "<<movie title>> has been successfuly added to the playlist"
}
```

### **Response (400) - BAD REQUEST**
One or more of the required key in the request body is not filled.
```
{
    "message": [
        "<< field name >> is required"
    ]
}
```
### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```

&nbsp;

## **5. POST /playlists/:id/comments**

Use this endpoint to add a comment to the selected playlist (by ID)

&nbsp;

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```
### **Request Params**
The playlist id for the playlist you want to add comment.
```
id = [integer]
```

### **Request Body**
```
{
    comment: "This is a comment"
}
```


### **Response (200) - OK**

```
{
    "message": "Your comment has been successfully added!"
}
```
### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```

### **Response (404) - NOT FOUND**
The playlist ID you specified is not found.
```
{
    "message": "Playlist not found"
}
```

&nbsp;

## **6. PATCH /playlists/:id**

Use this endpoint to update the playlist title & description.

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```

### **Request Body**
```
{
    "title": "Playlist title",
    "description": "Playlist description"
}
```
### **Response (200) - OK**
```
{
    "message": "Playlist successfully updated!"
}
```
### **Response (400) - BAD REQUEST**
One or more of the field is missing.
```
{
    "message": [
        "<< field name >> is required"
    ]
}
```
### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```
### **Response (403) - FORBIDDEN**
You are not allowed to make changes for this playlist.
```
{
    "message": "You are not authorized to make changes for this playlist."
}
```
### **Response (404) - NOT FOUND**
The ID you specified is not found.
```
{
    "message": "Playlist not found"
}
```


&nbsp;

## **7. POST /movies/playlist/:id**

Use this endpoint to add a movie to a current playlist. This will also store the movies in our database as well.

&nbsp;

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```
### **Request Params**
The playlist ID for the movies you want to add to.
```
id = [integer]
```

### **Request Body**
This will be the movie you want to add to the playlist.
```
{
    "title": [string],
    "genre": [string],
    "runtime": [integer],
    "director": [string],
    "imdbRating": [float],
    "posterUrl": [string]
}
```
### **Response (200) - OK**
```
{
    "message": "<< movie title >> has been successfully added to the playlist!"
}
```

### **Response (400) - BAD REQUEST**
One or more of the field is missing.
```
{
    "message": [
        "<< field name >> is required"
    ]
}
```
### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```
### **Response (403) - FORBIDDEN**
You are not allowed to make changes for this playlist.
```
{
    "message": "You are not authorized to make changes for this playlist."
}
```
### **Response (404) - NOT FOUND**
The ID you specified is not found.
```
{
    "message": "Playlist not found"
}
```


&nbsp;

## **8. DELETE /playlistmovies/:id/movies/:movieId**

Use this endpoint to remove a movie from a selected playlist.

&nbsp;

### **Request Header**
```
{
    access_token: {{accesstoken}}
}
```

### **Request Params**
The playlist ID (id) and movieId (movieId) for the movies you want to delete.
```
id = [integer]
movieId = [integer]

```

### **Request Body**
```
not needed
```
### **Response (200) - OK**
```
{
    "message": "Movie has been successfully removed from the playlist"
}
```

### **Response (401) - UNAUTHORIZED**
You did not specify the access token, or your token is invalid.
```
{
    "message": "Please login first!"
}
```
### **Response (403) - FORBIDDEN**
You are not allowed to make changes for this playlist.
```
{
    "message": "You are not authorized to make changes for this playlist."
}
```
### **Response (404) - NOT FOUND**
Either the playlist id or movie id you specified is not found.
```
{
    "message": "Playlist or movie is not found"
}
```