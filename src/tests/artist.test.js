require('../models')

const request = require("supertest")
const app = require("../app")
const Genre = require('../models/Genre')

const URL_BASE = '/api/v1/artists'

const artist = {
  name: "Seba yatra",
  country: "Colombia",
  formationYear: 2010,
  image: "ramdontext"

}

let artistId

test("POST -> URL_BASE, should return statusCode 201, and res.body.name === artist.name", async () => {

  const res = await request(app)
    .post(URL_BASE)
    .send(artist)

  artistId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)

})

test("GET -> URL_BASE, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

//maicol -> get one - //! C:10
test("GET 'URL_BASE/:id', should return status code 200 and res.body.name ==== artist.name", async () => {
  const res = await request(app)
    .get(`${URL_BASE}/${artistId}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)
})

//Oliver -> PUT //! C:10
test("PUT 'URL_BASE/:id' should return status code 200, and res.body.formationYear === bodyUpdate.formationYear", async () => {

  const bodyUpdate = {
    formationYear: 1975
  }

  const res = await request(app)
    .put(`${URL_BASE}/${artistId}`)
    .send(bodyUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.formationYear).toBe(bodyUpdate.formationYear)
})

test("Post -> URL_BASE/:id/genres, should return statusCode 200 and res.body.length === 1 ", async () => {

  const createGenre = await Genre.create({ name: "Pop" })

  const res = await request(app)
    .post(`${URL_BASE}/${artistId}/genres`)
    .send([createGenre.id])

  console.log(res.body);

  // console.log('genresId');
  // console.log(res.body[0].genresArtists.genreId);
  // console.log(createGenre.id);

  // console.log('artistasId');
  // console.log(res.body[0].genresArtists.artistId);
  // console.log(artistId);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].genresArtists.genreId).toBe(createGenre.id)
  expect(res.body[0].genresArtists.artistId).toBe(artistId)

  await createGenre.destroy()
})

//Kleine -> Delete //! C:10
test("DELETE 'URL_BASE/:id' return status code 204  ", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${artistId}`)

  expect(res.status).toBe(204)
})

