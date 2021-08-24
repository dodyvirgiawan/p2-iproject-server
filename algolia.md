# Sample format to be sent to algolia

Notes:
- **Searchable attributes**: title, description, movie.title, movie.genre, authors info
- **Filtering/faceting attributes**: movie.genre, movie.director, movie.imdbRating

&nbsp;

Per record:
```
{
    objectID: 3, // objectID is playlistId in database.
    title: "Testing",
    description: "Hello guys! This is testing.",
    author: {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@email.com"
    },
    Movies: [
        {
            title: "Blade Runner 2049",
            genre: "Action",
            runtime: 164,
            director: "Denis Villeneuve",
            imdbRating: 8,
            posterUrl: "https://upload.wikimedia.org/wikipedia/id/f/f2/Blade_Runner_2049_Poster.jpg"
        },
        {
            title: "Ready Player One",
            genre: "Science Fiction",
            runtime: 140,
            director: "Steven Spielberg",
            imdbRating: 7.4,
            posterUrl: "https://upload.wikimedia.org/wikipedia/id/0/0c/Ready_player_one_ver2_xlg.jpg"
        }
    ]
}
```