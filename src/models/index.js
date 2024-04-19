const Album = require("./Album");
const Artist = require("./Artist");
const Genre = require("./Genre");
const Song = require("./Song");

Genre.belongsToMany(Artist, { through: "genresArtists" })
Artist.belongsToMany(Genre, { through: "genresArtists" })

//! Album -> artistId
Album.belongsTo(Artist)
Artist.hasMany(Album)

//! Song -> albumId
Song.belongsTo(Album) //-> albumId
Album.hasMany(Song)

Song.belongsToMany(Artist, { through: 'songArtists' })
Artist.belongsToMany(Song, { through: 'songArtists' })

Song.belongsToMany(Genre, { through: "SongGenres" })
Genre.belongsToMany(Song, { through: "SongGenres" })