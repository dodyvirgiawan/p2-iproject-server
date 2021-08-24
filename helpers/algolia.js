const algoliasearch = require('algoliasearch')
const client = algoliasearch('9X0YUSI3R8', 'fc17c7bb8f541b1d620570ddeea48673') //! Change to process.env.ALGOLIA_API_KEY later
const index = client.initIndex('cineclub')

const testData = {
    objectID: 3,
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

index.saveObject(testData, { autoGenerateObjectIDIfNotExist: true });