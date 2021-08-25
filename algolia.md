# Sample format to be sent to algolia

Notes:
- **Searchable attributes**: title, description, movie.title, movie.genre, authors info
- **Filtering/faceting attributes**: movie.genre, movie.director, movie.imdbRating

&nbsp;

Initial seed data to algolia index.
```
[
    {
        "objectID": 1,
        "title": "Movie that will entertain your day",
        "description": "Hello guys! Today I will be sharing my awesome movie playlist for you to watch during weekend. For me, these movies are really great to watch, especially when you are spending your time with your family. What do you think?",
        "author": {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@email.com"
        },
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
    },
    {
        "objectID": 2,
        "title": "Movies that has the best jumpscare",
        "description": "Hi ho! I will be sharing my movie playlist that involves heart-wrecking jumpscare. These movies are a must-watch if you are a fans of horror movies. These are my top recommendations so far. Do you have any other recommendation as well? Please let me know!",
        "author": {
            "first_name": "Amy",
            "last_name": "May",
            "email": "amymay@email.com"
        },
        "Movies": [
            {
                "title": "The Babadook",
                "genre": "Horror",
                "runtime": 94,
                "director": "Jennifer Kent",
                "imdbRating": 6.8,
                "posterUrl": "https://m.media-amazon.com/images/M/MV5BMTk0NzMzODc2NF5BMl5BanBnXkFtZTgwOTYzNTM1MzE@._V1_FMjpg_UX1000_.jpg"
            },
            {
                "title": "The Shining",
                "genre": "Horror",
                "runtime": 146,
                "director": "Stanley Kubrick",
                "imdbRating": 8.4,
                "posterUrl": "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
            },
            {
                "title": "Hereditary",
                "genre": "Horror",
                "runtime": 89,
                "director": "Ari Aster",
                "imdbRating": 7.3,
                "posterUrl": "https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_FMjpg_UX1000_.jpg"
            }
        ]
    }
]
```

