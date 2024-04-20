require('../models')

const request = require("supertest")
const app = require("../app")
const Album = require("../models/Album")
const Artist = require('../models/Artist')
const Genre = require('../models/Genre')

const URL_BASE = '/api/v1/songs'

let song
let album
let songId

beforeAll(async () => {
  album = await Album.create({
    name: "mi primer album",
    image: "ramdon32",
    releaseYear: 2010
  })

  // console.log(album.id);

  song = {
    name: "No hay nadie mas",
    albumId: album.id
  }
})


test("POST -> URL_BASE, should return status code 201, and res.body.name === song.name", async () => {

  const res = await request(app)
    .post(URL_BASE)
    .send(song)

  songId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(song.name)

})

test("Get -> URL_BASE, should return statusCode 200, and res.body.length === 1", async () => {

  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get URL_BASE/:id, should return statusCode 200, res.body.name === song.name and res.body.albumId === song.albumId", async () => {
  const res = await request(app)
    .get(`${URL_BASE}/${songId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(song.name)
  expect(res.body.albumId).toBe(song.albumId)
})

test("Put -> URL_BASE/:id should return statusCode 200, and res.body.name === bodyUpdate.name", async () => {

  const bodyUpdate = {
    name: "Una Noche Sin Pensar"
  }
  const res = await request(app)
    .put(`${URL_BASE}/${songId}`)
    .send(bodyUpdate)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(bodyUpdate.name)
  expect(res.body.albumId).toBe(song.albumId)


});

test("Post -> URL_BASE/:id/artists, should return statusCode 200, and res.body.length === 1", async () => {
  const artist = {
    name: "Michael jackson",
    country: "USA",
    formationYear: "1980",
    image: "RAMDOM"
  }
  const createArtist = await Artist.create(artist)

  const res = await request(app)
    .post(`${URL_BASE}/${songId}/artists`)
    .send([createArtist.id])

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  // console.log(res.body[0].songArtists.artistId); //👌
  expect(res.body[0].songArtists.artistId).toBe(createArtist.id)//👌

  // console.log(res.body[0].songArtists.songId); //💪
  expect(res.body[0].songArtists.songId).toBe(songId)//💪

  await createArtist.destroy()
})

test("Post -> URL_BASE/:id/genres, should return statusCode 200, and res.body.length === 1", async () => {

  const genre = {
    name: "pop"
  }

  const createGenre = await Genre.create(genre)

  const res = await request(app)
    .post(`${URL_BASE}/${songId}/genres`)
    .send([createGenre.id])

  // console.log(res.body[0].SongGenres.songId);
  // console.log(res.body[0].SongGenres.genreId);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].SongGenres.songId).toBe(songId)
  expect(res.body[0].SongGenres.genreId).toBe(createGenre.id)

  await createGenre.destroy()

})

test("Delete -> URL_BASE/:id, should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${songId}`)

  expect(res.status).toBe(204)

  await album.destroy()

})